import { Recipe } from './../models/recipe';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private dbPath = '/recipes';
  recipeRef: AngularFireList<Recipe[]>;

  constructor(private db: AngularFireDatabase) {
    this.recipeRef = db.list(this.dbPath);
  }

  public updateRecipes(recipes: Recipe[]) {
    this.recipeRef.remove();
    this.recipeRef.push(recipes);
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.recipeRef.valueChanges().pipe(map(r => {
      return r[0];
    }));
  }
}
