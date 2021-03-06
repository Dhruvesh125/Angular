import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import {BehaviorSubject, throwError} from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";
import {environment} from '../../environments/environment';

@Injectable({providedIn:'root'})
export class AuthService{
    user=new BehaviorSubject<User>(null);
    private tokenExpirationTimer:any;
    constructor(private http:HttpClient,private router:Router){}
    signup(e_mail:string,pass:string){
       return  this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
            {
                email:e_mail,
                password:pass,
                returnSecureToken:true
            }
        ).pipe(catchError(this.handleError),tap(resData=>{this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
        }));
    }
    login(e_mail:string,pass:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            email:e_mail,
            password:pass,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),tap(resData=>{this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)}));
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogout(expirationDuation:number){
        
        this.tokenExpirationTimer= setTimeout(()=>{
            this.logout();
        },expirationDuation);
    }

    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string;
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime()
            this.autoLogout(expirationDuration);
        }

    }

    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
        const expirationDate=new Date(new Date().getTime()+(+expiresIn*1000));
            const user=new User(email,userId,token,expirationDate);
            this.user.next(user);
            this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }
    private handleError(errorRes:HttpErrorResponse){
        let errorMessage='An unknown error occured!';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage='This email already exists!';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage='This Password is not correct!';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage='This Email does Not exist!';
                    break;
                case 'USER_DISABLED':
                    errorMessage='This user account is disabled!';
                    break;
            }
            return throwError(errorMessage);
    }
}
export interface AuthResponseData{
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}