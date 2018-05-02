import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user/list/list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AppCommonModule } from '../common/common.module';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppCommonModule
  ],
  declarations: [
    UserListComponent
  ],
  providers: [
    UserService
  ]
})
export class AdminModule { }
