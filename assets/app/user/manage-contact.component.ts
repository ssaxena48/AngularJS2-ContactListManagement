import {Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import { Input } from "@angular/core";
import {Contact} from "./contact";
import {Router} from "@angular/router";

@Component({
    selector: 'my-manage-contact', 
    template: `
        <div>
        <button class="btn btn-primary" (click)="addContact()"> Add Contact</button>
        <my-contact-list [contacts]="contacts"></my-contact-list>
        </div>
    `
})

export class ManageContactComponent implements OnInit{
    contacts: Contact[];

    constructor(private userService : UserService, private router: Router){}

    ngOnInit(){
        this.userService.getContacts().subscribe(
            data => this.contacts = data
        );
    }

    addContact(){
        this.router.navigate(['/usr/contact/new']);
    }
}