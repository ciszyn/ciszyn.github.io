import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOfContentsComponent } from './table-of-contents/table-of-contents.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TableOfContentsComponent,
    RecipeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forChild([
      {
        path: "recipes",
        component: TableOfContentsComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ]
})
export class RecipesModule { }
