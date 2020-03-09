import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeservice:RecipeService, private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeservice.getRecipes(this.id);
      }
    )
  }
  recipe: Recipe;
  id : number ;

  onAddToShoppingList(){
    this.recipeservice.addIngredientsToShoppingList(this.recipe.ingredient);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo : this.route});
  //  this.router.navigate(['../' , this.id , 'edit'], {relativeTo : this.route});
  }

  onDeleteRecipe(){
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
