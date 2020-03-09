import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';
import { dropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations : [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        dropDownDirective
    ],
    imports : [CommonModule],
    exports : [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        dropDownDirective,
        CommonModule //we use common module instead of browser module in all other places expect main app to gain access to ngFor and ngIf.
    ],
    entryComponents : [
        AlertComponent
      ]
})
export class SharedModule{}