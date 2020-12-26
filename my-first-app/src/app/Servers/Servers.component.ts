import { Component } from '@angular/core';
@Component({
    // selector : '[app-servers]'
    // selector : '.app-servers',
    selector:'app-servers',
    // template:`<app-server></app-server>
    // <app-server></app-server>`
    templateUrl:'./servers.component.html'
})
export class ServersComponent {
    allowNewServer=false;
    serverCreationStatus='No server was created!';
    serverName='TestServer';
    serverCreated=false;
    servers=['TestServer','TestServer2']
    constructor(){
        setTimeout(()=>{this.allowNewServer=true;},2000);
    }
    onCreateServer(){
        this.serverCreated=true;
        this.serverCreationStatus='Server was created! Name is '+ this.serverName;
        this.servers.push(this.serverName);
    }
    onUpdateServerName(event: Event){
        this.serverName=(<HTMLInputElement>event.target).value;
    }
}