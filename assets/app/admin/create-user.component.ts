import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { AuthService } from "../auth/auth.service";
import { AdminService } from "./admin.service";
import { User } from "../auth/user";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'my-createUser',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <h1>{{ title }}</h1>
            <div *ngIf="myForm.errors" class="alert alert-danger">
                {{myForm.errors.UserValidations}}
            </div>            
            <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input [(ngModel)] = "user.firstName" formControlName="firstName" type="text" id="firstName" class="form-control">
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input [(ngModel)] = "user.lastName" formControlName="lastName" type="text" id="lastName" class="form-control">
                </div>
                <div class="form-group">
                    <label for="email">Mail</label>
                    <input [(ngModel)] = "user.email" formControlName="email" type="email" id="email" class="form-control">
                </div>
                <div *ngIf= "!user._id" class="form-group">
                    <label for="password">Password</label>
                    <input [(ngModel)] = "user.password" formControlName="password" type="password" 
                    id="password" class="form-control" >
                </div>
                <div class="form-group">
                <label for="type">User Type</label>
                <select [(ngModel)] = "user.type" formControlName="type" class="form-control" id="type">
                    <option selected value="default">Default</option>
                    <option value="admin">Admin</option>
                </select>
                </div>
                <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid">Submit</button>
            </form>
        </section>
    `
})
export class CreateUserComponent implements OnInit {
    myForm: FormGroup;
    title: String;
    user: User;
    //id is to track the user id to be edited
    id: string;     
    
    constructor(private fb:FormBuilder, 
                private adminService: AdminService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.myForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: [''],
            type: ['default']
        });

        this.user = new User();
    }

    onSubmit() {
        console.log(this.user);

        var index = this.adminService.users.indexOf(this.user);

        //Create user
        if (!this.id || this.id == 'new') {
            this.adminService.createUser(this.user)
                .subscribe(
                    data => { 
                        console.log(data.obj.firstName);
                        alert("User: " + data.obj.firstName + " created Successfully");
                        this.myForm.reset();
                    },
                    error => {
                        if(error.error.errors.email){
                            this.myForm.setErrors({UserValidations: error.error.errors.email.message});
                        }
                        else {
                            this.myForm.setErrors(error.error.message);
                        }
                        console.error(error)
                    }
                );            
        }
        else {
             this.adminService.updateUser(this.user)
                .subscribe(
                    data => {
                        console.log(data);
                        this.adminService.users[index] = data.obj;
                        this.router.navigate(['/admin/manageUser']);
                    },
                    error => console.error(error)
            );
        }
    }

    ngOnInit(){
        this.id = this.activatedRoute.snapshot.params['id'];

        if (!this.id || this.id == 'new') {
            this.title = "Create User";
        }
        else{
            this.title = "Edit User";
            
            this.adminService.getUser(this.id)
                .subscribe(
                    data => this.user = data,
                    response => {
                        if (response.status == 404) {
                            this.router.navigate(['NotFound']);
                        }
                    });
        }
    }
}