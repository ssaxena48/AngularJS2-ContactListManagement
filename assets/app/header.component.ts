import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
@Component({
    selector: 'my-header',
    template: `
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">
          Edureka
        </a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li><a [routerLink]="['']" routerLinkActive="active" >Home</a></li>
          <li *ngIf="isAdmin()" > <a [routerLink]="['/admin/home']" routerLinkActive="active"> Admin </a></li>
          <li *ngIf="!isAdmin()" > <a [routerLink]="['/usr/profile']" routerLinkActive="active"> User </a></li>
        </ul>
        <button *ngIf= "!isLoggedIn()" type="button" class="btn btn-default navbar-btn navbar-right" (click)="onSignin()">
          Sign in
        </button>
        <button *ngIf= "isLoggedIn()" type="button" class="btn btn-default navbar-btn navbar-right" (click)="onSignout()">
          Sign out
        </button>
      </div><!-- /.navbar-collapse -->
     </div>
    </nav> 
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent {
    constructor(private router: Router, private authService: AuthService){

    }

    onSignin(){
        this.router.navigate(['/auth/signin']);
    }

    isLoggedIn() : boolean{
      return this.authService.isLoggedIn();
    }

    isAdmin() : boolean{
      return this.authService.admin;
    }

    onSignout(){
        this.authService.logout();
        this.router.navigate(['/auth/signin']);
    }
    
}