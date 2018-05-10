import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService, Role } from '../role.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss']
})
export class RoleUpdateComponent implements OnInit, OnChanges {

  @Input() id: string;
  form: FormGroup;
  filteredPermissions: Observable<any[]>;
  constructor(public fb: FormBuilder, public service: RoleService) { }

  ngOnInit() {
      this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id && changes.id.currentValue) {
      this.service.getById(changes.id.currentValue)
      .subscribe(_ => this.patchForm(_));
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required ],
      description: '',
      permissions: []
    });
  }

  patchForm(role: Role) {
    this.form.patchValue({
      name: role.name,
      description: role.description
    });
  }

  onSubmitRole() {
    debugger;
  }

}
