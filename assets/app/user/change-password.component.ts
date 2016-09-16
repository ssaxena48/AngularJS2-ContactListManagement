import {Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import {PasswordValidators} from './password-validators';
import {UserService} from './user.service';

@Component({
    selector: 'my-change-password',
    template: `
    <form [formGroup]="myForm" (ngSubmit)="changePassword()">
    <div class="form-group">
        <label for="oldPassword">Current Password</label>
        <input 
            id="oldPassword" 
            type="password" 
            class="form-control"
            formControlName="oldPassword">
        <div *ngIf="myForm.find('oldPassword').touched && myForm.find('oldPassword').errors">
            <div
                *ngIf="myForm.find('oldPassword').errors.required" 
                class="alert alert-danger">Old password is required.</div>
            <div
                *ngIf="myForm.find('oldPassword').errors.validOldPassword"
                class="alert alert-danger">Old password is incorrect.</div>
        </div>
    </div>
    <div class="form-group">
        <label for="newPassword">New Password</label>
        <input 
            id="newPassword" 
            type="password" 
            class="form-control"
            formControlName="newPassword">
        <div *ngIf="myForm.find('newPassword').touched && myForm.find('newPassword').errors">
            <div 
                *ngIf="myForm.find('newPassword').errors.required"
                class="alert alert-danger">
                New password is required.
            </div>
            <div 
                *ngIf="myForm.find('newPassword').errors.minLength"
                class="alert alert-danger">
                Password should be minimum {{ newPassword.errors.minLength }} characters.
            </div>
        </div>
    </div>
    <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input 
            id="confirmPassword" 
            type="password" 
            class="form-control"
            formControlName="confirmPassword">
        <div 
            *ngIf="myForm.find('confirmPassword').touched && !myForm.find('confirmPassword').valid"
            class="alert alert-danger">
            Confirm the password.</div>
        <!-- 
            Checking for myForm.errors.passwordShouldMatch because this validation is applied at the form itself. 
         -->
        <div 
            *ngIf="myForm.find('confirmPassword').touched && myForm.errors && myForm.errors.passwordsShouldMatch"
            class="alert alert-danger">
            Passwords don't match.</div>
        </div>
    <button class="btn btn-primary" type="submit" [disabled]="!myForm.valid">Change Password</button>
</form>
    `
})
export class ChangePasswordComponent {
    myForm: FormGroup;
    
    constructor(fb: FormBuilder, private userService: UserService){
       this.myForm = fb.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            confirmPassword: ['', Validators.required]}, { validator: PasswordValidators.passwordsShouldMatch });
    }
    
    changePassword(){
        // Validating the oldPassword on submit. In a real-world application
        // here, we'll use a service to call the server. The server would
        // tell us that the old password does not match. 
        var oldPassword = this.myForm.find('oldPassword');
        // if (oldPassword.value != '1234') 
        //     oldPassword.setErrors({ validOldPassword: true });
        
        var newPassword = this.myForm.find('newPassword');
        if (this.myForm.valid){
            this.userService.changePassword(newPassword.value, oldPassword.value).subscribe(
                data => {
                    console.log(data);
                    alert("Password Successfully Updated");
                },
                error => {
                    oldPassword.setErrors({validOldPassword: true});
                    console.log(error);
                }
            );
        }
    }


}