import { Component } from '@angular/core';

@Component({
    selector : 'app-server',
    templateUrl:'./server.component.html',
    styles:[`
    .online{
        color:white; 
    }
    `]
})
export class ServerComponent {
    serverId=10;
    serverstatus: string='offline';

    constructor(){
        this.serverstatus=Math.random()>0.5?'online':'offline';
    }
    getServerStatus(){
        return this.serverstatus;

    }
    getColor(){
        return this.serverstatus==='online'?'green':'red'
    }
}