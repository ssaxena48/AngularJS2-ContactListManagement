import {Component } from '@angular/core';
import {UserService} from './user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from "../auth/auth.service";

import { AdminService } from "../admin/admin.service";
import { User } from "../auth/user";
import { Contact } from "./contact";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'my-contact', 
  template: `
            <h1>{{ title }}</h1>
            <div *ngIf="myForm.errors" class="alert alert-danger">
                {{myForm.errors.UpdateContact}}
            </div>
            <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="name">Name </label>
                    <input [(ngModel)] = "contact.name" formControlName="name" type="text" 
                    id="name" class="form-control">
                    <div *ngIf="myForm.find('name').touched && !myForm.find('name').valid" class="alert alert-danger">
                        <strong>Name is required.</strong>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input [(ngModel)] = "contact.email" formControlName="email" type="text" 
                    id="email" class="form-control">
                    <div *ngIf="myForm.find('email').touched && !myForm.find('email').valid" class="alert alert-danger">
                        <strong>Invalid email.</strong>
                    </div>                    
                </div>
                <div class="form-group">
                    <label for="phoneno">Phone Number (Format: xxx-xxx-xxxx)</label>
                    <input [(ngModel)] = "contact.phoneno" formControlName="phoneno" type="text" 
                    id="phoneno" class="form-control">
                    <div *ngIf="myForm.find('phoneno').touched && !myForm.find('phoneno').valid" class="alert alert-danger">
                        <strong>Invalid phone number.</strong>
                    </div>                       
                </div>
                <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid">Submit</button>
            </form>
  `
})

export class ContactComponent {
  myForm: FormGroup;
  contact: Contact = new Contact();
  title: string; 
  //id is to track the contact id to be edited
  id: string; 

    constructor(private fb: FormBuilder, private authService: AuthService, 
    private adminService : AdminService, private userService: UserService, private router: Router,
    private activatedRoute: ActivatedRoute){
            
            this.myForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, 
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
            phoneno: ['', Validators.compose([Validators.required, 
            Validators.pattern("[1-9]{3}[\s-][0-9]{3}[\s-][0-9]{4}")])]
          });

          this.contact = new Contact();
  }

  onSubmit(){
        //If new contact
        if (!this.id || this.id == 'new') {
            this.userService.addContact(this.contact)
                .subscribe(
                    data => {
                        console.log(data);
                        this.router.navigate(['/usr/manage-contact']);
                    },
                    error => console.error(error)
            )
        }
        else{
            this.userService.updateContact(this.contact).subscribe(
                data => {
                    alert("Contact updated");  
                    this.router.navigate(['/usr/manage-contact']);                  
                },
                error => {
                    this.myForm.setErrors({UpdateContact : error.message});
                }
            )
        }

  }

  ngOnInit(){
        this.id = this.activatedRoute.snapshot.params['id'];
        if (!this.id || this.id == 'new') {
            this.title = "Add Contact";
            return;
        }

        this.title = "Edit Contact";        
            
        this.userService.getContact(this.id)
            .subscribe(
                data => this.contact = data,
                error => {
                    console.log(error);
                });
    }
}