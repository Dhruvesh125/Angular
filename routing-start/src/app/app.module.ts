import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes,RouterModule, Router } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes:Routes=[
  {path:'',component:HomeComponent}, //localhost:4200/users
  {path:'users',component:UsersComponent,children:[{path:':id/:name',component:UserComponent}]},
  
  {path:'servers',canActivateChild:[AuthGuard] ,component:ServersComponent,children:[
    {path:':id',component:ServerComponent,resolve:{server:ServerResolver}},
  {path:':id/edit',component:EditServerComponent,canDeactivate:[CanDeactivateGuard]}
  ]},
  // {path:'not-found',component:PageNotFoundComponent},
  {path:'not-found',component:ErrorPageComponent,data:{message:'Page not Found!'}},
  {path:'**',redirectTo:'/not-found'}//It should be at last bcz routes check done from top to bottom (All url not mentioned in above path)
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // RouterModule.forRoot(appRoutes,{useHash:true})
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService,AuthService,AuthGuard,CanDeactivateGuard,ServerResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
