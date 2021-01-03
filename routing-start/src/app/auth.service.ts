import { rejects } from "assert";

export class AuthService{
    loggedIn=false;

    isAuthenticated(){
        const promise=new Promise(
(resolve,rejects)=>{
    setTimeout(()=>{resolve(this.loggedIn)

    },800);
}
        );
        return promise;
    }
    login(){
        this.loggedIn=true;

    }
    logOut(){
        this.loggedIn=false;
    }
}