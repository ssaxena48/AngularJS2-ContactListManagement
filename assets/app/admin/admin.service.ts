//This service is meant to provide all the methods to perform functions when 'default' user login
import { Injectable } from "@angular/core";
import { Http, Headers , URLSearchParams} from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { User } from "../auth/user";

@Injectable()
export class AdminService {
    users: User[] = [];
    constructor (private http: Http) {}
    
    createUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        //const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }
    
    updateUser(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('http://localhost:3000/user/' + user._id + token, body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
    }

    getUser(id: String){
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        return this.http.get('http://localhost:3000/user/' + id , {search : params})
            .map(response => {
                const data = response.json().obj;
                let user = new User();
                user.email = data.email; 
                user.type = data.type;
                user.firstName = data.firstName; 
                user.lastName = data.lastName;
                user._id = data._id;
                user.type = data.type;
                return user;
            })
            .catch(error => Observable.throw(error));
    }

    search(user:any) {
        const body = JSON.stringify(user);
        console.log("Body ... " + body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';        
        return this.http.post('http://localhost:3000/user/search' + token, body,  {headers: headers})
            .map(response => {
                const data = response.json().obj;
                console.log(data);
                let objs: User[] = [];
                for (let i = 0; i < data.length; i++) {
                    let user = new User();
                    user.email = data[i].email; 
                    user.type = data[i].type;
                    user.firstName = data[i].firstName; 
                    user.lastName = data[i].lastName;
                    user._id = data[i]._id;
                    user.type = data[i].type;
                    objs.push(user);
                }
                this.users = objs;
                return objs;
            });
    }

    delete(user: User){
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/user/' + user._id + token)
            .map(response => {
                this.users.splice(this.users.indexOf(user), 1);
                return response.json();
            })
            .catch(error => Observable.throw(error.json()));
    }

}

