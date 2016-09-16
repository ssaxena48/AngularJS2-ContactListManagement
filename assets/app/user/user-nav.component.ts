import {Component} from "@angular/core";

@Component({
    selector: 'my-user-nav',
    template: `
            <div class="row">
                <div class="col-md-2">
                    <header class="row spacing">
                        <nav>
                            <ul class="nav nav-pills nav-stacked">
                                <li routerLinkActive="active"><a [routerLink]="['profile']">User Profile</a></li>
                                <li routerLinkActive="active"><a [routerLink]="['change-password']">Change Password</a></li>
                                <li routerLinkActive="active"><a [routerLink]="['manage-contact']">Manage Contact</a></li>
                            </ul>
                        </nav>
                    </header>
                </div>
                <div class="col-md-10">
                    <router-outlet></router-outlet>
                </div>
            </div>
    `
})
export class UserNavComponent {
    constructor () {}

}

