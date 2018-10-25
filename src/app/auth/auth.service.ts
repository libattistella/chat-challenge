import { Injectable } from '@angular/core';
import { TokenResponse, TokenPayload, UserDetails } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: String;
  private tokenPayload: TokenPayload;

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    return this.token !== null;
  }

  private saveToken(token: string): void {
    localStorage.setItem('chat-token', token);
    this.token = token;
  }

  getToken(): String {
    if (!this.token) {
      this.token = localStorage.getItem('chat-token');
    }
    return this.token;
  }

  logout(): void {
    this.token = null;
    window.localStorage.removeItem('chat-token');
    // this.router.navigateByUrl('/');
  }

  getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/auth/${type}`, user);
    } else {
      base = this.http.get(`/api/auth/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }
}