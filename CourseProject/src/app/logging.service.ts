import { Injectable } from "@angular/core"

@Injectable({providedIn:'root'})
export class LoggingService {
    lastLog:String;
    printLog(messsage:string){
        console.log(messsage);
        console.log("Last Log::",this.lastLog);
        this.lastLog=messsage;
    }
}