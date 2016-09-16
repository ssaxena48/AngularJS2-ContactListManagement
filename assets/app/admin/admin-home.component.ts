import {Component } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'my-adminHome', 
    template: `
    <div class="jumbotron">
        <h2>Hello, Admin</h2>
        <p class="lead">Admin users can create, edit, delete or search user</p>
      </div>
      <div class="row">
         <div class="col-md-6">
            <div class="thumbnail">
                  <div class="caption">
                    <h3>Create User</h3>
                    <p>Create new users</p>
                    <p><a [routerLink]="['/admin/user/new']" class="btn btn-primary">Go</a></p>
                </div>
            </div>
        </div>
        <div class="col-md-6">
           <div class="thumbnail">
               <div class="caption">
                    <h3>Search User</h3>
                    <p>Search users based on criteria and then take actions (Edit/Delete)</p>
                    <p><a [routerLink]="['/admin/manageUser']" class="btn btn-primary">Go</a></p>
                </div>
            </div>
        </div>
      </div>
    `
})
export class AdminHomeComponent {
    public createuserimg: string;
    constructor(private authService: AuthService){
      this.createuserimg = "../images/create-user.png";
    }
}