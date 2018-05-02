import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '@app/common/services/auth.service';
import { NotificationService } from '../common/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

    constructor(
        public authService: AuthService,
        public fb: FormBuilder,
        public router: Router,
        public notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email] ],
            password: ['', Validators.required ]
        });
    }

    fbLogin() {
        this.authService.fbLogin()
            .then(() => this.authService.afterLogin());
    }

    instagramLogin() {
        this.authService.instagramRedirect()
            .then(() => this.authService.afterLogin());
    }

    googleLogin() {
        this.authService.googleRedirect()
            .then(() => this.authService.afterLogin());
    }

    linkedInLogin() {
        this.authService.linkedInRedirect()
            .then(() => this.authService.afterLogin());
    }

    onSubmitLogin() {
        this.authService.classicLogin(this.form.value)
            .then(() => this.authService.afterLogin());
    }

}
