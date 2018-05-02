import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/list/list.component';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
    { path: 'user', children: [
        { path: '', redirectTo: 'list' },
        { path: 'list', component: UserListComponent }
    ] },
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
