import { BrowserModule } from '@angular/platform-browser';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DictionaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forChild([
      { path: 'notes/dictionary', component: DictionaryComponent }
    ])
  ]
})
export class NotesModule { }
