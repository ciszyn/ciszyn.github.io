import { Recipe } from './../models/recipe';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private dbPath = '/recipes';
  recipeRef: AngularFireObject<Recipe[]>;

  constructor(private db: AngularFireDatabase) {
    this.recipeRef = db.object(this.dbPath);
  }

  public updateRecipes(recipes: Recipe[]) {
    this.recipeRef.set(recipes);
  }

  public getRecipes(): Observable<Recipe[] | null> {
    return this.recipeRef.valueChanges();
  }
}
