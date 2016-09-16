import {Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { AuthService } from "../auth/auth.service";

import { AdminService } from "../admin/admin.service";
import { User } from "../auth/user";

@Component({
    selector: 'my-profile', 
    template: `
            <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input [(ngModel)] = "user.firstName" formControlName="firstName" type="text" 
                    id="firstName" class="form-control">
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input [(ngModel)] = "user.lastName" formControlName="lastName" type="text" 
                    id="lastName" class="form-control">
                </div>
                <div class="form-group">
                    <label for="email">Mail</label>
                    <input [(ngModel)] = "user.email" formControlName="email" type="email" 
                    id="email" class="form-control">
                </div>
                <div class="form-group">
                    <label for="type">Type</label>
                    <p class="form-control-static">{{user.type}}</p>
                </div>
                <button type="submit" class="btn btn-primary" [disabled]="!myForm.dirty || !myForm.valid">Save</button>
            </form>
    `
})

export class ProfileComponent implements OnInit{
  myForm: FormGroup;
  private _user: User;

  get user():User {
        return this._user;
  }

  set user(user:User) {
        this._user = user;
  }

  constructor(private fb: FormBuilder, public authService: AuthService, 
            public adminService : AdminService){
            this.myForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, 
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])]            
        });

        this.user = this.authService.loggedInUser;
  }

  ngOnInit(){

  }

  onSubmit(){
      this.adminService.updateUser(this._user).subscribe(
          data => {
              alert("User Successfully Updated !!");
              localStorage.setItem('user', JSON.stringify(data.obj));
              this.authService.loggedInUser = data.obj;
          },
          error => {
              this.myForm.setErrors({ProfileUpdate : error.message});
          }
      );
  }

}