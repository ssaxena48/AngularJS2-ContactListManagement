import { Component } from '@angular/core';

@Component({
    template: `
    	<title>403 Error - Permission Denied</title>


        <h1>403 - Permission Denied</h1>
        <p>

        <blockquote>

        You do not have permission to retrieve the URL or link you requested.<p>

        Please inform the administrator of the referring page, if you think this was a mistake.

        </blockquote>
    `
})
export class NotAuthorizedComponent { }