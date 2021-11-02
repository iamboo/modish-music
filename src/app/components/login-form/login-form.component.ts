import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationInterface, LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  public signInFormGroup: FormGroup = this.formBuilder.group({
    emailControl: ['', []],
    passwordControl: ['', []]
  });

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {}

  login(event: Event) {
    if (event) {
      event.preventDefault();
    }

    const email = this.signInFormGroup.controls['emailControl'].value;
    const password = this.signInFormGroup.controls['passwordControl'].value;
    this.loginService.onLogin(email, password).subscribe((response: AuthenticationInterface) => {
      if (response.errorMessage) {
        // show toaster error
      }
    });
  }
}
