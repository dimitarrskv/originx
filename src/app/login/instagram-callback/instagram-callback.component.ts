import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/common/services/auth.service';

@Component({
  selector: 'app-instagram-callback',
  templateUrl: './instagram-callback.component.html',
  styleUrls: ['./instagram-callback.component.scss']
})
export class InstagramCallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const isLink = this.router.url.indexOf('?link=true') > -1;
    const accessToken = this.router.url.split('access_token=')[1];

    if (!isLink) {
      this.authService.instagramLogin(accessToken)
        .then(() => this.authService.afterLogin());
    } else {
      this.authService.instagramLink(accessToken)
        .then(() => this.router.navigate(['/profile']));
    }
  }
}
