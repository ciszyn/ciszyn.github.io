import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
