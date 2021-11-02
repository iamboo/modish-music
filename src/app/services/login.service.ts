import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

export interface AuthenticationInterface {
  email: string;
  name: string;
  errorMessage: string | null;
}

@Injectable()
export class LoginService {
  @Output() public authenticated: EventEmitter<AuthenticationInterface | null> = new EventEmitter();

  constructor() {}

  onLogin(email: string, password: string): Observable<AuthenticationInterface> {
    // this should post to an authentication endpoint
    const fakeResponse: AuthenticationInterface = { email: 'skippy@lumpkin.com', name: 'Skippy Lumpkin', errorMessage: null };
    if (!fakeResponse.errorMessage) {
      this.authenticated.emit(fakeResponse);
    }
    return observableOf(fakeResponse);
  }

  onSignOut() {
    this.authenticated.emit(null);
  }
}
