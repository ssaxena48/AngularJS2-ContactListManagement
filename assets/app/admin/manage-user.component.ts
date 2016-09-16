import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { AuthService } from "../auth/auth.service";
import { AdminService } from "./admin.service";
import { User } from "../auth/user";

@Component({
    selector: 'my-manageUser', 
    template: `
        <section class="col-md-8 col-md-offset-2">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">Search (Enter atleast one of the Search Criterias) </h3>
            </div>
            <div class="panel-body">
                <form [formGroup]="myManageForm" (ngSubmit)="onSearch()">
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input formControlName="firstName" type="text" id="firstName" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input formControlName="lastName" type="text" id="lastName" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="email">Mail</label>
                        <input formControlName="email" type="email" id="email" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary" [disabled]="!myManageForm.valid">Search</button>
                </form>
            </div>
        </div>
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">Search Results</h3>
            </div>
            <div class="panel-body">
                <my-user-list [users]="users"></my-user-list>
            </div>
        </div>
    </section>
    `
})
export class ManageUserComponent {
    myManageForm: FormGroup;
    users: User[];
    
    constructor(private fb:FormBuilder, private adminService: AdminService) {
        this.users = adminService.users;
    }

    onSearch() {
        console.log("Inside Search Method" + this.myManageForm.value.email);
        var searchCriteria = {};
        if(this.myManageForm.value.firstName){
            searchCriteria['firstName']= this.myManageForm.value.firstName;
        }
        if(this.myManageForm.value.lastName){
            searchCriteria['lastName']= this.myManageForm.value.lastName;
        }
        if(this.myManageForm.value.email){
            searchCriteria['email']= this.myManageForm.value.email;
        }
        
        this.adminService.search(searchCriteria)
            .subscribe(
                data => {
                    this.users = data;
                }
            );
    }

    ngOnInit() {
        this.myManageForm = this.fb.group({
            firstName: [''],
            lastName: [''],
            email: ['']
        });
    }    


}