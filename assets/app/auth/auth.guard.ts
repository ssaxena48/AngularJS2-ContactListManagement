import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(public authService : AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    if (state.url !== '/auth/signin' && !this.authService.isLoggedIn()) {
            this.router.navigate(['/auth/signin']);
            return false;
    }
    return true;
  }
}