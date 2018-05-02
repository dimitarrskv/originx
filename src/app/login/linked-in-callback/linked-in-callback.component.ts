import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-linked-in-callback',
  templateUrl: './linked-in-callback.component.html',
  styleUrls: ['./linked-in-callback.component.scss']
})
export class LinkedInCallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.linkedInLogin(this.router.url.split('code=')[1])
      .then(() => this.authService.afterLogin());
  }

}
