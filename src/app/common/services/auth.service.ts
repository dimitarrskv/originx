import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RequestOptions } from '@angular/http';
import { NavigationExtras, Router } from '@angular/router';
import { ConfigurationService } from './configuration.service';

declare const FB: any;

@Injectable()
export class AuthService {

    redirectUrl: string;
    isLoggedIn: boolean;
    userDetails: any;

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService,
        private router: Router,
        private configurations: ConfigurationService,
        private location: Location
    ) {
        this.isLoggedIn = this.isAuthenticated();
        FB.init({
            appId: this.configurations.fbClientID,
            status: false, // the SDK will attempt to get info about the current user immediately after init
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: false,  // With xfbml set to true, ...
            version: 'v2.8' // use graph api version 2.8k8
        });
    }

    fbLogin(isLink: boolean = false) {
        return new Promise((resolve, reject) => {
            FB.login(result => {
                if (result.authResponse) {
                    resolve(result);
                } else {
                    reject();
                }
            }, {scope: 'public_profile,email'});
        }).then(_ => {
            if (isLink) {
                return this.fbLink(_);
            } else {
                return this.fbLoginCallback(_);
            }
        });
    }

    fbLoginCallback(result: any) {
        return new Promise((resolve, reject) => {
            return this.http.post(this.configurations.userXBaseUrl + `/auth/facebook`,
                { access_token: result.authResponse.accessToken }, { observe: 'response' })
                .toPromise()
                .then(response => {
                    const token = response.headers.get('Authorization');
                    this.login(token);
                    resolve(response);
                })
                .catch(() => reject());
            });
    }

    instagramRedirect(isLink: boolean = false) {
        return new Promise((resolve, reject) => {
            const baseUrl = this.configurations.instagramOAuthUrl;
            const redirectUri = this.configurations.originXBaseUrl +
                '/instagram-callback' + (isLink ? '?link=true' : '');
            let params = new HttpParams();
                params = params.append('client_id', this.configurations.instagramClientID);
                params = params.append('response_type', 'token');
                params = params.append('redirect_uri', redirectUri);

            const uri = baseUrl + '?' + params.toString();
            window.location.href = uri;
        });
    }

    googleRedirect(isLink: boolean = false) {
        return new Promise((resolve, reject) => {
            const baseUrl = this.configurations.googleOAuthUrl;
            const redirectUri = this.configurations.originXBaseUrl +
                '/google-callback' + (isLink ? '?link=true' : '');
            let params = new HttpParams();
                params = params.append('client_id', this.configurations.googleClientID);
                params = params.append('response_type', 'token');
                params = params.append('redirect_uri', redirectUri);
                params = params.append('scope', 'email profile');

            const uri = baseUrl + '?' + params.toString();
            window.location.href = uri;
        });
    }

    instagramLogin(accessToken: string) {
        return new Promise((resolve, reject) => {
            return this.http.get(`http://localhost:4300/auth/instagram?access_token=` + accessToken,
                { observe: 'response' })
                .toPromise()
                .then(response => {
                    const token = response.headers.get('Authorization');
                    this.login(token);
                    resolve(response);
                })
                .catch(() => reject());
            });
    }

    googleLogin(accessToken: string) {
        return new Promise((resolve, reject) => {
            return this.http.get(`http://localhost:4300/auth/google?access_token=` + accessToken,
                { observe: 'response' })
                .toPromise()
                .then(response => {
                    const token = response.headers.get('Authorization');
                    this.login(token);
                    resolve(response);
                })
                .catch(() => reject());
            });
    }

    instagramLink(accessToken: string) {
        return new Promise((resolve, reject) => {
            return this.http.post(this.configurations.userXBaseUrl + `/account/link/instagram`,
                { access_token: accessToken },
                { observe: 'response' })
                .toPromise()
                .then(response => {
                    this.router.navigate(['/profile']);
                })
                .catch(() => reject());
            });
    }

    googleLink(accessToken: string) {
        return new Promise((resolve, reject) => {
            return this.http.post(this.configurations.userXBaseUrl + `/account/link/google`,
                { access_token: accessToken },
                { observe: 'response' })
                .toPromise()
                .then(response => {
                    this.router.navigate(['/profile']);
                })
                .catch(() => reject());
            });
    }

    fbLink(result: any) {
        return new Promise((resolve, reject) => {
            return this.http.post(this.configurations.userXBaseUrl + `/account/link/facebook`,
                { access_token: result.authResponse.accessToken },
                { observe: 'response' })
                .toPromise()
                .then(response => {
                    this.router.navigate(['/home']);
                    this.router.navigate(['/profile']);
                })
                .catch(() => reject());
            });
    }

    linkedInRedirect() {
        return new Promise((resolve, reject) => {
            const baseUrl = 'https://www.linkedin.com/oauth/v2/authorization';
            let params = new HttpParams();
                params = params.append('client_id', '78soe5qv30pn1c');
                params = params.append('response_type', 'code');
                params = params.append('redirect_uri', window.location.origin + '/linked-in-callback');

            const uri = baseUrl + '?' + params.toString();
            window.location.href = uri;
        });
    }

    linkedInLogin(accessToken: string) {
        return new Promise((resolve, reject) => {
            return this.http.get(`http://localhost:4300/auth/linked-in?oauth2_access_token=` + accessToken,
                { observe: 'response' })
                .toPromise()
                .then(response => {
                    const token = response.headers.get('Authorization');
                    this.login(token);
                    resolve(response);
                })
                .catch(() => reject());
            });
    }

    classicLogin(data: any) {
        return new Promise((resolve, reject) => {
            return this.http.post(`http://localhost:4300/auth/login`, data, { observe: 'response' })
                .toPromise()
                .then(response => {
                    const token = response.headers.get('Authorization');
                    this.login(token);
                    resolve(response);
                })
                .catch(() => reject());
        });
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn = this.isAuthenticated();
        this.router.navigate(['/login']);
    }

    login(token: string) {
        localStorage.setItem('token', token);
        this.isLoggedIn = this.isAuthenticated();
    }

    afterLogin() {
        if (this.isAuthenticated()) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            const redirect = this.redirectUrl ? this.redirectUrl : '/profile';

            // Set our navigation extras object
            // that passes on our global query params and fragment
            const navigationExtras: NavigationExtras = {
                queryParamsHandling: 'preserve',
                preserveFragment: true
            };

            // Redirect the user
            this.router.navigate([redirect], navigationExtras);
        }
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return token && !this.jwtHelper.isTokenExpired(token) && this.setUserDetails(token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    setUserDetails(token: string) {
        this.userDetails = this.jwtHelper.decodeToken(token);
        return true;
    }

    getCurrentUser(): Observable<any> {
        return this.http.get(`http://localhost:4300/auth/me`);
    }
}
