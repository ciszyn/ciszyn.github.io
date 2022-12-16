import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { StravaViewerComponent } from './strava-viewer/strava-viewer.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthConfig } from 'angular-oauth2-oidc';
import { StravaLoginComponent } from './strava-login/strava-login.component';

@NgModule({
  declarations: [
    StravaViewerComponent,
    StravaLoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['https://www.strava.com/api/v3/'],
          sendAccessToken: true
      }
  }),
    RouterModule.forChild([
      {
        path: "strava",
        component: StravaViewerComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "strava-login",
        component: StravaLoginComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  bootstrap: [
    StravaViewerComponent
  ]
})
export class StravaModule { }
