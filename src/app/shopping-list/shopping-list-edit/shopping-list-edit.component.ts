import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy {

@ViewChild ('f', {static : false}) Fref : NgForm ;

  constructor(private shoppingservice:shoppingService) { }

  subscription : Subscription;
  editMode = false ;
  editedItemIndex : number;
  editItem : Ingredient ;

  ngOnInit() {
    this.subscription = this.shoppingservice.itemEdit.subscribe(
      (index : number) => {
        this.editMode = true;
        this.editedItemIndex = index ;
        this.editItem = this.shoppingservice.getIngredient(index);
        this.Fref.setValue({
          name : this.editItem.name,
          amount : this.editItem.amount
        });
      }
    );
  }

    onSubmit(form : NgForm){
    const value = form.value;
    const createIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingservice.editIngredients(this.editedItemIndex,createIngredient);
    }
    else {
    this.shoppingservice.addIngredient(createIngredient);
    }
    this.editMode = false ;
    form.reset();
  }

  onClear(){
    this.Fref.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingservice.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
