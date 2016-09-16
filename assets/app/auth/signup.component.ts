import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user";
import { Router } from "@angular/router";

@Component({
    selector: 'my-signup',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
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
                <div class="form-group">
                    <label for="password">Password</label>
                    <input formControlName="password" type="password" id="password" class="form-control">
                    <div *ngIf="myForm.find('password').touched && myForm.find('phoneno').errors" >
                        <div *ngIf="myForm.find('password').errors.required">
                        Password is required
                        </div>
                        <div *ngIf="myForm.find('password').errors.minLength">
                        Password minimum length is 8 characters.
                        </div>
                    </div>   
                </div>
                <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid">Sign Up</button>
            </form>
        </section>
    `
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private fb:FormBuilder, private authService: AuthService, private router: Router) {}

    onSubmit() {
        const user = new User();            
        user.email = this.myForm.value.email; 
        user.password = this.myForm.value.password;
        user.firstName = this.myForm.value.firstName; 
        user.lastName = this.myForm.value.lastName;

        console.log(user);
        this.authService.signup(user)
            .subscribe(
                data => {
                    console.log(data);
                    alert("User: " + data.obj.firstName + " registered successfully");
                    this.myForm.reset();
                },
                error => console.error(error)
            )
    }

    ngOnInit() {
        this.myForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        });
    }
}