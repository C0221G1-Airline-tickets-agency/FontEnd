import {Injectable} from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USERNAME_KEY = 'AuthUsername';
const EMAIL_KEY = 'Email';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor() {
  }

  signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY);
  }

  public saveEmail(email: string) {
    window.localStorage.removeItem(EMAIL_KEY);
    window.localStorage.setItem(EMAIL_KEY, email);
  }

  public getEmail(): string {
    return localStorage.getItem(EMAIL_KEY);
  }
  public saveAuthorities(authorities: string[]) {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(TOKEN_KEY)).forEach(roles => {
        this.roles.push(roles);
      });
    }
    return this.roles;
  }
}
