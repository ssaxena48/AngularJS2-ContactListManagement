import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";

//Authenitcation related component and services
import { AuthenticationComponent } from "./auth/authentication.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { HeaderComponent } from "./header.component";
import { HomeComponent } from "./home.component";

//Admin related component and service
import { AdminService } from "./admin/admin.service";
import { AdminHomeComponent } from "./admin/admin-home.component";
import { AdminNavComponent } from "./admin/admin-nav.component";
import { CreateUserComponent } from "./admin/create-user.component";
import { ManageUserComponent } from "./admin/manage-user.component";
import { UserListComponent } from "./admin/user-list.component";

//User related component and service
import { ContactComponent } from "./user/contact.component";
import { ManageContactComponent } from "./user/manage-contact.component";
import { ProfileComponent } from "./user/profile.component";
import { UserNavComponent } from "./user/user-nav.component";
import { UserService } from "./user/user.service";
import { ContactListComponent } from "./user/contact-list.component";
import { ChangePasswordComponent } from "./user/change-password.component";

//Common
import { ROUTING } from "./app.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AuthService } from "./auth/auth.service";
import { CanActivateViaAuthGuard } from "./auth/auth.guard";
import { CanActivateViaAdminGuard } from "./admin/admin.guard";
import { CanActivateViaUserGuard } from "./user/user.guard";
import {NotAuthorizedComponent} from "./not-authorized.component";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        SignupComponent,
        SigninComponent,
        HeaderComponent,
        UserListComponent,
        HomeComponent,
        ContactComponent,
        ManageContactComponent,
        ProfileComponent,
        AdminHomeComponent, 
        AdminNavComponent ,
        CreateUserComponent, 
        ManageUserComponent,
        UserListComponent,
        ContactListComponent,
        ChangePasswordComponent,
        NotAuthorizedComponent          
    ],
    imports: [BrowserModule, ROUTING, FormsModule, ReactiveFormsModule, HttpModule],
    bootstrap: [AppComponent],
    providers: [AuthService, AdminService, UserService, CanActivateViaAdminGuard, 
    CanActivateViaAuthGuard, CanActivateViaUserGuard ]

})
export class AppModule {

}