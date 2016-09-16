import { Routes } from "@angular/router";

import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";

export const AUTH_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'signin' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
];