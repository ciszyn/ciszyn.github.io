import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-strava-login',
  templateUrl: './strava-login.component.html',
  styleUrls: ['./strava-login.component.scss']
})
export class StravaLoginComponent implements OnInit {

  constructor(private oauthService: OAuthService, router: Router) {
    this.oauthService.configure(environment.strava);
    this.oauthService.tryLogin().then(
      r => router.navigate(["strava"])
    )
  }

  ngOnInit(): void {
  }

}
