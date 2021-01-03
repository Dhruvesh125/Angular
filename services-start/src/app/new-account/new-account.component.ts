import { Component } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
  // providers:[LoggingService]
})
export class NewAccountComponent {
  
constructor(private loggingService:LoggingService,private accountService:AccountsService){
  this.accountService.statusUpdated.subscribe(
    (status:string)=> alert('New Status '+status)
  );
}

  onCreateAccount(accountName: string, accountStatus: string) {
    // const service=new LoggingService();
    // service.logStatusChanged(accountStatus);
    // console.log('A server status changed, new status: ' + accountStatus);
    this.accountService.addAccount(accountName,accountStatus);
    this.loggingService.logStatusChanged(accountStatus);
  }
}
