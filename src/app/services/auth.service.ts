import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  isLoggedIn = signal<boolean>(false);

  constructor() {
  
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedIn.set(status);
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn.set(false);
  }
}