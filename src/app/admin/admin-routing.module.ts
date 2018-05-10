import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/list/list.component';
import { RoleListComponent } from './role/list/list.component';
import { CommonModule } from '@angular/common';
import { RoleListDrawerComponent } from './role/list/drawer/role-list-drawer.component';

const appRoutes: Routes = [
    { path: 'user', children: [
        { path: '', redirectTo: 'list' },
        { path: 'list', component: UserListComponent }
    ] },
    { path: 'role/list', component: RoleListComponent , children: [
        { path: '', component: RoleListDrawerComponent, outlet: 'drawer' }
    ] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
