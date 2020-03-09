import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();

  /*  recipe1 : Recipe[]=[
        new Recipe('Hakka Noodles','Basic Noodles with very less spices !!',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
      [
          new Ingredient('Tomotoes',5),
          new Ingredient('Green Chilli',1),
          new Ingredient('Carrot',3),
          new Ingredient('Potatoes',5)
      ]),
      new Recipe('Shezwan Noodles','Spicy Noodles with soya sauce !!',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
      [
        new Ingredient('Tomotoes',5),
        new Ingredient('Red Chilli',10),
        new Ingredient('Green Chilli',3),
        new Ingredient('Carrot',5)
      ])
    ];
    */
    recipe1: Recipe[] = [];

    setRecipes(recipes : Recipe[]){
        this.recipe1 = recipes;
        this.recipesChanged.next(this.recipe1.slice());
    }

    constructor(private shopping1:shoppingService){}

    addIngredientsToShoppingList(ingredient:Ingredient[]){
        this.shopping1.addIngredients(ingredient);
    }

    getRecipe(){
        return this.recipe1.slice();
    }

    getRecipes(index : number){
        return this.recipe1[index];
    }

    addRecipe(recipe : Recipe){
        this.recipe1.push(recipe);
        this.recipesChanged.next(this.recipe1.slice());
    }

    updateRecipe(index : number, newRecipe : Recipe){
        this.recipe1[index] = newRecipe ;
        this.recipesChanged.next(this.recipe1.slice());
    }

    deleteRecipe(index : number){
        this.recipe1.splice(index,1);
        this.recipesChanged.next(this.recipe1.slice());
    }
}