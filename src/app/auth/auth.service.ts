import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean {
    return true;
  }

  signup(email: string, password: string) {

  }

  signin(email: string, password: string) {

  }
}
