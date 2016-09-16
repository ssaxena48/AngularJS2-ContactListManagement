import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from "@angular/router";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";

@Component({
    selector: 'my-app',
    template: ` 
        <div class="container-fluid">
            <my-header></my-header>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
    
}