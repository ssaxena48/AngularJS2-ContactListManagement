import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';
import {CanActivateViaAuthGuard} from '../auth/auth.guard';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class CanActivateViaUserGuard extends CanActivateViaAuthGuard {
  constructor(public authService : AuthService, public router: Router) {
      super(authService, router);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
      if(!super.canActivate(route,state)){
          return false;
      }
      else{
          if(!(this.authService.loggedInUser.type == "default")){
            this.router.navigate(['403-not-authorized']);
            return false;
          }
          else{
              return true;
          }
        
      }
  }
}