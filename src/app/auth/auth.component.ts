import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector : 'app-auth',
    templateUrl : './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private closeSub: Subscription ;

    @ViewChild(PlaceHolderDirective, {static : false}) alertHost: PlaceHolderDirective ;

    constructor(private authservice: AuthService, private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form1: NgForm) {
        if (!form1.valid) {
            return ;
        }
        this.isLoading = true ;
        const email = form1.value.email ;
        const password = form1.value.password;
        let authObs: Observable<AuthResponseData> ;

        if (this.isLoginMode) {
          authObs = this.authservice.login(email, password);
        } else {
        authObs = this.authservice.signup(email, password);
        }
        authObs.subscribe(resData => {
            console.log(resData);
            this.isLoading = false ;
            this.router.navigate(['/recipes']);
            }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorMessage(errorMessage);
            this.isLoading = false ;
            });
        form1.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorMessage(message: string) {
       const alertComFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
       const hostViewContainerRef = this.alertHost.viewContainerRef;
       hostViewContainerRef.clear();
       const componentRef = hostViewContainerRef.createComponent(alertComFactory);

       componentRef.instance.message = message ;
       this.closeSub =  componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();    
        }
    }
}
