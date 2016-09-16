import { Component, OnInit } from "@angular/core";

import { User } from "../auth/user";
import { AdminService } from "./admin.service";
import { Input } from "@angular/core";

@Component({
    selector: 'my-user-list',
    template: `
        <div>
            <table class="table table-striped">
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Action</th> 
            </tr>
            </thead>
            <tbody>
                <tr *ngFor="let user of users">
                    <td> <strong> {{user.firstName}} </strong> </td> 
                    <td contenteditable="true"> {{user.lastName}} </td> 
                    <td> {{user.email}} </td>
                    <td> {{user.type}} </td>
                    <td> <a [routerLink]="['/admin/user', user._id]">
                    <i class="glyphicon glyphicon-edit"></i>
                </a> | <a (click)="onDelete(user)"><i class="glyphicon glyphicon-remove"></i> </a></td>
                </tr>

            </tbody>
        </table>
    </div>
     `
})
export class UserListComponent {
    @Input() users : User[];
    editMode: boolean = false;

    constructor(private adminService: AdminService) {}

    onDelete(user: User){
        var result = confirm("Are you sure to delete this user?");
        if (result) {
            //Logic to delete the contact
            this.adminService.delete(user).subscribe(
                data => {
                    console.log(data);
                    alert("User Successfully Deleted");
                },
                error => console.error(error)
            );
        }
    }

    onEdit(user: User){
        this.editMode = true;
    }
}