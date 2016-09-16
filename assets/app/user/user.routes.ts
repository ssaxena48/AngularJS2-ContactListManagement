import { Routes } from "@angular/router";

import { ContactComponent } from "./contact.component";
import { ProfileComponent } from "./profile.component";
import { ManageContactComponent } from "./manage-contact.component";
import { ChangePasswordComponent } from "./change-password.component";
import { CanActivateViaAuthGuard } from "../auth/auth.guard";

export const USER_ROUTES: Routes = [
    { path: 'profile', component: ProfileComponent},
    { path: 'manage-contact', component: ManageContactComponent},
    { path: 'contact/:id', component: ContactComponent},
    { path: 'contact/new', component: ContactComponent},
    {path: 'change-password', component: ChangePasswordComponent},
    {path: '', redirectTo: 'profile' }
];