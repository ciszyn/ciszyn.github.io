import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('menuTriggered', [
      state('opened', style({
        left: 0
      })),
      state('closed', style({
        right: '100vw'
      })),
      transition('opened => closed', [
        animate('.3s')
      ]),
      transition('closed => opened', [
        animate('.3s')
      ])
    ])
  ]
})
export class AppComponent {
  title = 'ciszyn-github-io';
  public user$: Observable<firebase.User | null>
  public menuActive = false;

  constructor(auth: AuthService) {
    this.user$ = auth.user$
  }

  public toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
