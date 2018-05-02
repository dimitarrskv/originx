import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';

import { CanDeactivateGuard } from '@app/common/services/can-deactivate-guard.service';
import { AuthGuard } from '@app/common/services/auth-guard.service';
import { SelectivePreloadingStrategy } from '@app/common/services/selective-preloading-strategy.service';
import { InstagramCallbackComponent } from './login/instagram-callback/instagram-callback.component';
import { GoogleCallbackComponent } from './login/google-callback/google-callback.component';
import { LinkedInCallbackComponent } from './login/linked-in-callback/linked-in-callback.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'instagram-callback', component: InstagramCallbackComponent },
    { path: 'google-callback', component: GoogleCallbackComponent },
    { path: 'linked-in-callback', component: LinkedInCallbackComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
