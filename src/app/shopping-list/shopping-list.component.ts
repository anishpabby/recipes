import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'] ,
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private activatedSub : Subscription ;

  constructor(private shoppingservice:shoppingService) { }

  ngOnInit() {
    this.ingredients=this.shoppingservice.getIngredients();
    this.activatedSub = this.shoppingservice.addedIngredient.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  ngOnDestroy(){
    this.activatedSub.unsubscribe();
  }

  onEditItem(index : number){
    this.shoppingservice.itemEdit.next(index);
  }

}
