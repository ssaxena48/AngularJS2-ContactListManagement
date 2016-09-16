//This service is meant to provide all the methods to perform functions when 'default' user login
import { Injectable } from "@angular/core";
import { Http, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { User } from "../auth/user";
import { Contact } from "./contact";

@Injectable()
export class UserService {
    contacts: Contact[] = [];
    constructor (private http: Http) {}

//Add contact    
addContact(contact: Contact) {
    const body = JSON.stringify(contact);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.post('http://localhost:3000/contact' + token, body, {headers: headers})
        .map(response => {
            const data = response.json().obj;
            let contact = new Contact();
            contact.userId = data.user._id;
            contact.email = data.email;
            contact.name = data.name;
            contact.phoneno = data.phoneno;
            contact._id = data._id;
            return contact;
        })
        .catch(error => Observable.throw(error.json()));
}

// Get all user contacts
getContacts(){
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    let params: URLSearchParams = new URLSearchParams();
    params.set('token', token);
    return this.http.get('http://localhost:3000/contact/all/', {search : params})
    .map(response => {
        const data = response.json().obj;
        console.log(data);
        let objs: Contact[] = [];
        for (let i = 0; i < data.length; i++) {
            let contact = new Contact();
            contact.name = data[i].name; 
            contact.email = data[i].email;
            contact.phoneno = data[i].phoneno; 
            contact._id = data[i]._id;
            objs.push(contact);
        }
        this.contacts = objs;
        return objs;
    })
    .catch(error => Observable.throw(error));
}

// Get contact for id
getContact(id: string){
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        let params: URLSearchParams = new URLSearchParams();
        params.set('token', token);
        return this.http.get('http://localhost:3000/contact/' + id, {search : params})
        .map(response => {
            const data = response.json().obj;
            let contact = new Contact();
            contact.name = data.name;
            contact.email = data.email;
            contact.phoneno = data.phoneno;
            contact._id = data._id;
            return contact;
        })
        .catch(error => Observable.throw(error.json()));
    }

// Update contact
updateContact(contact: Contact) {
        const body = JSON.stringify({
            name : contact.name,
            email : contact.email,
            phoneno : contact.phoneno
        });
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('http://localhost:3000/contact/' + contact._id + token, body, {headers: headers})
            .map(response => response.json())
            .catch(error => Observable.throw(error.json()));
}

//Delete contact
deleteContact(contact: Contact){
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://localhost:3000/contact/' + contact._id + token)
            .map(response => {
                this.contacts.splice(this.contacts.indexOf(contact), 1);
                return response.json();
            })
            .catch(error => Observable.throw(error.json()));
}

changePassword(newPassword : string, oldPassword){
    const body = JSON.stringify({oldPassword : oldPassword, newPassword : newPassword});
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.post('http://localhost:3000/user/changePassword' + token, body, {headers: headers})
        .map(response => response.json() )
        .catch(error => Observable.throw(error.json()));
}
}