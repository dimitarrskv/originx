import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RoleCreateComponent>,
    public fb: FormBuilder,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: RoleService
  ) { }

  ngOnInit() {
      this.createForm();
  }

  createForm() {
      this.form = this.fb.group({
          name: ['', [Validators.required] ],
          description: ''
      });
  }

  onCreate() {
    this.service.create(this.form.value)
      .then(() => {
        this.onNoClick();
      });
    // this.authService.classicLogin(this.form.value)
    //   .then(() => this.authService.afterLogin());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
