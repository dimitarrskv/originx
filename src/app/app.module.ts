import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';

export function jwtOptionsFactory() {
  return {
      tokenGetter: () => localStorage.getItem('token') ? localStorage.getItem('token').split('Bearer ')[1] : '',
      whitelistedDomains: ['localhost:4300']
  };
}

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { NavbarComponent } from './partials/navbar/navbar.component';
import { TopMenuComponent } from './partials/navbar/top-menu/top-menu.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { InstagramCallbackComponent } from './login/instagram-callback/instagram-callback.component';
import { GoogleCallbackComponent } from './login/google-callback/google-callback.component';
import { LinkedInCallbackComponent } from './login/linked-in-callback/linked-in-callback.component';
import { ProfileService } from './profile/profile.service';
import { AppCommonModule } from './common/common.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    // Partials
    NavbarComponent,
    TopMenuComponent,
    LoginComponent,
    InstagramCallbackComponent,
    GoogleCallbackComponent,
    LinkedInCallbackComponent,

    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'origin-x-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      // { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      // { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ]),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    HttpClientModule,

    JwtModule.forRoot({
      jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory
      }
    }),
    AppCommonModule.forRoot()
  ],
  providers: [
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
