import { Component } from '@angular/core';

@Component({
    selector : 'app-server',
    templateUrl:'./server.component.html'
})
export class ServerComponent {
    serverId=10;
    serverstatus: string='offline';

    getServerStatus(){
        return this.serverstatus;

    }
}