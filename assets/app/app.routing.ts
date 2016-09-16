import { Routes, RouterModule } from "@angular/router";

import { ADMIN_ROUTES } from "./admin/admin.routes";
import { USER_ROUTES } from "./user/user.routes";
import { AdminNavComponent } from "./admin/admin-nav.component";
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";
import {HomeComponent} from "./home.component";
import { UserNavComponent } from "./user/user-nav.component";
import {NotAuthorizedComponent} from "./not-authorized.component";
import { CanActivateViaUserGuard } from "./user/user.guard";
import { CanActivateViaAdminGuard } from "./admin/admin.guard";

export const APP_ROUTES: Routes = [
    { path: 'auth/signin', component: SigninComponent},
    { path: 'auth/signup', component: SignupComponent},
    { path: 'admin', component: AdminNavComponent, children: [...ADMIN_ROUTES] ,
        canActivate: [CanActivateViaAdminGuard]},
    { path: 'usr', component: UserNavComponent, children: [...USER_ROUTES] , 
        canActivate: [CanActivateViaUserGuard]},
    {path: '403-not-authorized', component: NotAuthorizedComponent},
    { path: '', component: HomeComponent},    
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);