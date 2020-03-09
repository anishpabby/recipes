import { NgModule } from '@angular/core';
import { shoppingService } from './shopping-list/shopping.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [shoppingService, RecipeService, {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptorService,
        multi : true
      }]
})
export class CoreModule{}