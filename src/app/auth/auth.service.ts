import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean ;
}

@Injectable({providedIn : 'root'})
export class AuthService {

    private expirationDurationTimer : any ;

    constructor(private http: HttpClient,private router : Router) {}

    user = new BehaviorSubject<User>(null); //behavior subject stores the latest value of the user even if it is not emitted(next) yet

    signup(email: string, password: string) {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIwg20S6zEyFEaBSzUappLoReDc6beGLk ',
        {
            email,
            password,
            returnSecureToken : true
        }).pipe(catchError(this.handleError),tap (resData =>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIwg20S6zEyFEaBSzUappLoReDc6beGLk ',
        {
            email,
            password,
            returnSecureToken : true
        }).pipe(catchError(this.handleError),tap (resData =>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
    }

    private handleAuthentication(email:string, userId : string, token : string, expiresIn : number){
          const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const user = new User(email, userId, token, expirationDate);
            this.user.next(user);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userData',JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An error occured !!';

        if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
   
        switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS' :
                    errorMessage = 'The email address is already in use by another account.' ;
                    break ;
                case 'EMAIL_NOT_FOUND' :
                    errorMessage = 'There is no user record corresponding to this identifier.';
                    break ;
                case 'INVALID_PASSWORD' :
                    errorMessage = 'The password is invalid or the user does not have a password.' ;
                    break ;
            }
        return throwError(errorMessage);
    }

    autoLogin(){
        const userData : {
            email : string;
            id : string;
            _token : string;
            _tokenExpirationDate : string;
        } = JSON.parse(localStorage.getItem('userData'));   
        if(!userData){
            return ;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if(loadedUser.token){
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.expirationDurationTimer){
            clearTimeout(this.expirationDurationTimer);
        }
        this.expirationDurationTimer = null ;
    }

    autoLogout(expirationDuration : number){
        console.log(expirationDuration);
      this.expirationDurationTimer = setTimeout(() => {
        this.logout();    
        }, expirationDuration);
    }
}
