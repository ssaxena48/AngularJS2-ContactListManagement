import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { User } from './user';

@Injectable()
export class AuthService {
    loggedInUser: User = new User();
    private _admin:boolean = false;
    
    get admin():boolean {
        return this._admin;
    }

    constructor (private http: Http) {
       if(this.isLoggedIn()){
            var obj = localStorage.getItem('user');
            this.loggedInUser = JSON.parse(obj);
            this._admin = this.loggedInUser.type == "admin" ? true : false;
       }
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map(response => {
                var data = response.json();
                this.loggedInUser = data.obj;
                this._admin = this.loggedInUser.type == "admin" ? true : false;
                return data;
                }
            )
            .catch(error => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

}