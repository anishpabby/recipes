import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn : 'root'})
export class DataStorageService{

constructor(private http : HttpClient, private recipeservice: RecipeService,
            private authservice : AuthService){}

storeRecipes(){
const recipes = this.recipeservice.getRecipe();
this.http.put('https://recipe-book-e9a63.firebaseio.com/recipes.json',recipes).subscribe(response => {
    console.log(response);
});
}

fetchRecipes(){
    return this.http.get<Recipe[]>('https://recipe-book-e9a63.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
        return recipes.map(recipe => {
             return{...recipe,ingredient : recipe.ingredient ? recipe.ingredient : []};
        });
    }),
    tap(recipes => {
        this.recipeservice.setRecipes(recipes);
        })
    );
 // exhaustMap replaces the observable on which it is called by the observable called inside the exhaustMap
}

}