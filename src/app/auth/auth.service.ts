import { Injectable } from '@angular/core';
import { TokenResponse, TokenPayload, UserDetails } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: String;
  private tokenPayload: TokenPayload;

  constructor(private http: HttpClient) { }

  // public isAuthenticated(): boolean {
  //   return this.token !== null;
  // }

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

  logout(): Observable<any> {
    return this.disconnectUserFromEveryChannel();
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

  disconnectUserFromEveryChannel() {
    const token = this.getToken();
    return this.http.get('/api/users/disconnect', { headers: { Authorization: `Bearer ${token}` }}).pipe(map(
      (response) => {
        this.token = null;
        window.localStorage.removeItem('chat-token');
        return response;
      },
      (err) => {
        console.log('err', err);
        return err;
      }), catchError(
        (err) => {
          console.log('catch', err);
          return throwError(err);
        }));
  }
}
