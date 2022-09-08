import { BrowserModule } from '@angular/platform-browser';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from '../services/auth-guard.service';
import { NotesComponent } from './notes/notes.component';
import { ItialianTensesComponent } from './itialian-tenses/itialian-tenses.component';



@NgModule({
  declarations: [
    DictionaryComponent,
    NotesComponent,
    ItialianTensesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forChild([
      {
        path: 'notes', component: NotesComponent, canActivate: [AuthGuardService], children: [
          {
            path: 'dictionary', component: DictionaryComponent, canActivate: [AuthGuardService]
          },
          {
            path: 'tenses', component: ItialianTensesComponent, canActivate: [AuthGuardService]
          }
        ]
      },
    ])
  ]
})
export class NotesModule { }
