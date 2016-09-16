import { Routes } from "@angular/router";

import { AdminHomeComponent } from "./admin-home.component";
import { CreateUserComponent } from "./create-user.component";
import { ManageUserComponent } from "./manage-user.component";
import { CanActivateViaAuthGuard } from "../auth/auth.guard";
import { CanActivateViaAdminGuard } from "./admin.guard";

export const ADMIN_ROUTES: Routes = [
    { path: 'home', component: AdminHomeComponent},
    { path: 'user/new', component: CreateUserComponent},
    { path: 'user/:id', component: CreateUserComponent},
    { path: 'manageUser', component: ManageUserComponent}
];