import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/common/services/auth.service';

@Component({
  selector: 'app-google-callback',
  templateUrl: './google-callback.component.html',
  styleUrls: ['./google-callback.component.scss']
})
export class GoogleCallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const isLink = this.router.url.indexOf('?link=true') > -1;
    const accessToken = this.router.url.split('access_token=')[1].split('&token_type=')[0];

    if (!isLink) {
      this.authService.googleLogin(accessToken)
        .then(() => this.authService.afterLogin());
    } else {
      this.authService.googleLink(accessToken)
        .then(() => this.router.navigate(['/profile']));
    }
  }

}
