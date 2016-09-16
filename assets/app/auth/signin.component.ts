import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { User } from "./user";

@Component({
    selector: 'my-signin',
    template: `
        <section class="col-md-8 col-md-offset-2">
            <div *ngIf="myForm.errors" class="alert alert-danger">
                {{myForm.errors.SigninError}}
            </div>
            <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="email">Mail</label>
                    <input formControlName="email" type="email" id="email" class="form-control">
                    <div *ngIf="myForm.find('email').touched && myForm.find('email').errors" class="alert alert-danger">
                        Email is required.
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input formControlName="password" type="password" id="password" class="form-control">
                    <div *ngIf="myForm.find('password').touched && myForm.find('password').errors" class="alert alert-danger">
                        Password is required.
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid">Login</button>
            </form>
            <a [routerLink]="['/auth/signup']" class="new-account">Sign up now</a>
        </section>
    `,
    styles: [`
        .new-account
        {
            display: block;
            margin-top: 15px;
        }
    `]
})
export class SigninComponent implements OnInit {
    myForm: FormGroup;
    error: string;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

    onSubmit() {
        const user = new User();
        user.email = this.myForm.value.email;
        user.password =  this.myForm.value.password;
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('user', JSON.stringify(data.obj));
                    if(this.authService.admin){
                        this.router.navigate(['/admin/home']);
                    }
                    else {
                        this.router.navigate(['/usr/profile']);
                    }
                },
                error => {
                    this.myForm.setErrors({SigninError: error.error.message});
                }
            );
    }

    ngOnInit() {
        this.myForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

}