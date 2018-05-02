import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {

    constructor(private http: HttpClient) { }

    updateProfile(data: any) {
        return this.http.post(`http://localhost:4300/account/profile`, data);
    }

    resetPassword(data: any) {
        return this.http.post(`http://localhost:4300/account/password`, data);
    }
}
