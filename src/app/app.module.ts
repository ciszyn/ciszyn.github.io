import { RecipesModule } from './recipes/recipes.module';
import { NotesModule } from './notes/notes.module';
import { PongModule } from './pong/pong.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    PongModule,
    NotesModule,
    RecipesModule,
    BrowserAnimationsModule,
    HammerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
