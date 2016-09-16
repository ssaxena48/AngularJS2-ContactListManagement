import {Component} from "@angular/core";

@Component({
    selector: 'my-admin',
    template: `
        <header class="row spacing">
            <nav>
                <ul class="nav nav-tabs">
                    <li routerLinkActive="active"><a [routerLink]="['home']">Dashboard</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['user/new']">User</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['manageUser']">Manage User</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
     `
})
export class AdminNavComponent {
    constructor () {}

}

