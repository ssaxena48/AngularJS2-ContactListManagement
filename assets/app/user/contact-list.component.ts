import {Component } from '@angular/core';
import {UserService} from './user.service';
import { Input } from "@angular/core";
import {Contact} from "./contact";

@Component({
    selector: 'my-contact-list', 
    template: `
        <div>
            <table class="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Action</th> 
            </tr>
            </thead>
            <tbody>
                <tr *ngFor="let contact of contacts">
                    <td> <strong> {{contact.name}} </strong> </td> 
                    <td> {{contact.email}} </td>
                    <td> {{contact.phoneno}} </td>
                    <td> <a [routerLink]="['/usr/contact/', contact._id]">
                    <i class="glyphicon glyphicon-edit"></i>
                </a> | <a (click)="onDelete(contact)"><i class="glyphicon glyphicon-remove"></i> </a></td>
                </tr>

            </tbody>
        </table>
    </div>
    `
})

export class ContactListComponent {
    @Input() contacts : Contact[];

    constructor(private userService : UserService){}

    onDelete(contact: Contact){
        var result = confirm("Are you sure to delete this contact?");
        if (result) {
            //Logic to delete the contact
            this.userService.deleteContact(contact).subscribe(
                data => {
                    console.log(data);
                    alert("Contact Successfully Deleted");
                },
                error => console.error(error)
            );
        }

    }
}