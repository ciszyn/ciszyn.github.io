import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss']
})
export class TableOfContentsComponent implements OnInit {
  public recipes: Recipe[] = [];
  public currentRecipe: Recipe = new Recipe("", "");
  public currentRecipeIndex = -1;
  public filter: string = "";
  public showList: boolean = true;

  constructor(private service: RecipeService) { }

  ngOnInit(): void {
    this.service.getRecipes().subscribe(r => {
      this.recipes = r ?? [];
      if (this.currentRecipeIndex != -1) {
        this.currentRecipe = this.recipes[this.currentRecipeIndex];
      }
    })
  }

  public saveRecipe() {
    if (this.currentRecipeIndex == -1) {
      this.currentRecipeIndex = this.recipes.push(this.currentRecipe) - 1;
    }

    this.service.updateRecipes(this.recipes);
  }

  public deleteRecipe() {
    this.recipes = this.recipes.filter((r, i) => i != this.currentRecipeIndex);

    this.service.updateRecipes(this.recipes);
    this.setNewRecipe();
  }

  public setRecipe(recipe: Recipe, index: number) {
    this.currentRecipe = recipe;
    this.currentRecipeIndex = index;
    this.filter = "";
  }

  public setNewRecipe() {
    this.currentRecipe = new Recipe("", "");
    this.currentRecipeIndex = -1;
    this.filter = "";
  }

  public getRecipes() {
    return this.recipes.filter(r => r.title.toLowerCase().includes(this.filter.toLowerCase()));
  }

  public enableList() {
    this.showList = true;
  }

  public disableList() {
    this.showList = false;
  }
}
