import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AppCommonModule } from '../common/common.module';
import { UserService } from './user/user.service';
import { UserListComponent } from './user/list/list.component';
import { RoleService } from './role/role.service';
import { RoleListComponent } from './role/list/list.component';
import { RoleListDrawerComponent } from './role/list/drawer/role-list-drawer.component';
import { RoleCreateComponent } from './role/create/role-create.component';
import { RoleUpdateComponent } from './role/update/role-update.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppCommonModule
  ],
  declarations: [
    UserListComponent,
    RoleListComponent,
    RoleListDrawerComponent,
    RoleCreateComponent,
    RoleUpdateComponent
  ],
  providers: [
    UserService,
    RoleService
  ],
  entryComponents: [
    RoleCreateComponent
  ]
})
export class AdminModule { }
