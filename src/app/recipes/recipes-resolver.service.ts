import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn : 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private datastorageservice : DataStorageService,
                private recipeservice : RecipeService){}

    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){

        const recipes = this.recipeservice.getRecipe();
        if(recipes.length === 0){
        return this.datastorageservice.fetchRecipes();
        } else {
            return recipes;
        }
    }


}