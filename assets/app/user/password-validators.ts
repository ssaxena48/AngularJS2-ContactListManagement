import { FormGroup, FormControl } from "@angular/forms";

export class PasswordValidators {

    static passwordsShouldMatch(group: FormGroup){
        var newPassword = group.find('newPassword').value;
        var confirmPassword = group.find('confirmPassword').value;
        
        // If either of these fields is empty, the validation will be bypassed. 
        if (newPassword == '' || confirmPassword == '')
            return null;
        
        if (newPassword != confirmPassword)
            return { passwordsShouldMatch: true };
            
        return null;
    }
}