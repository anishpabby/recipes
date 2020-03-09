import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class shoppingService{

   private ingredients: Ingredient[]=[
        new Ingredient('Apples',5), 
        new Ingredient('Tomatoes',10)
      ];

      addedIngredient=new Subject<Ingredient[]>();
      itemEdit= new Subject<number>();

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index : number){
      return this.ingredients[index];
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.addedIngredient.next(this.ingredients.slice());
    }

    addIngredients(ingredient: Ingredient[]){
  //      for(let ing of ingredients){
  //          this.addIngredient(ing);
  //      }
        this.ingredients.push(...ingredient);
        this.addedIngredient.next(this.ingredients.slice());
    }

    editIngredients(index : number, newIngredient : Ingredient){
      this.ingredients[index] = newIngredient ;
      this.addedIngredient.next(this.ingredients.slice());
    }

    deleteIngredient(index : number){
      this.ingredients.splice(index,1);
      this.addedIngredient.next(this.ingredients.slice());
    }

  }

