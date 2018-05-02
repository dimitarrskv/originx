import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@app/common/services/auth.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    form: FormGroup;
    pwdForm: FormGroup;
    details: User;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private service: ProfileService
    ) { }

    ngOnInit() {
        this.createForm();
        this.createPwdForm();
        this.authService.getCurrentUser()
        .subscribe(
            res => this.patchForm(res)
        );
    }

    createForm() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email] ],
            name: ['', Validators.required ],
            website: ['', Validators.required ],
            location: ['', Validators.required ]
        });
    }

    createPwdForm() {
        this.pwdForm = this.fb.group({
            password: ['', Validators.required ],
            confirmPassword: ['', Validators.required ]
        });
    }

    patchForm(user: User) {
        this.details = user;
        const profile = user.profile;
        this.form.patchValue({
            email: user.email,
            name: profile.name,
            website: profile.website,
            location: profile.location
        });
    }

    onSubmitProfile() {
        this.service.updateProfile(this.form.value)
            .subscribe(
                data => {
                    debugger;
                },
                err => {
                    debugger;
                }
            );
    }

    onSubmitPassword() {
        this.service.resetPassword(this.pwdForm.value)
            .subscribe(
                data => {
                    debugger;
                },
                err => {
                    debugger;
                }
            );
    }

    fbLink() {
        this.authService.fbLogin(true)
            .then();
    }

    instagramLink() {
        this.authService.instagramRedirect(true)
            .then();
    }

    googleLink() {
        this.authService.googleRedirect(true)
            .then();
    }
}

export class User {
    email = '';
    profile = new Profile();
    instagram = '';
    facebook = '';
    google = '';
}

export class Profile {
    name = '';
    gender = '';
    website = '';
    location = '';
}

export class Password {
    password = '';
    confirmPassword = '';
}
