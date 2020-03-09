import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations : [
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports : [
        SharedModule,
        FormsModule,
        RouterModule.forChild([
        { path : '' , component : ShoppingListComponent}
    ])],
    // we user forChild in all the places where we need to use routes except the main root place.
})

export class ShoppingListModule{}