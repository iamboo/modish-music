import { Component } from '@angular/core';
import { AuthenticationInterface, LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authenticated: AuthenticationInterface | null = null;

  constructor(private loginService: LoginService) {
    this.loginService.authenticated.subscribe((response: AuthenticationInterface) => {
      this.authenticated = response;
    });
  }

  signOut() {
    this.loginService.onSignOut();
  }
}
