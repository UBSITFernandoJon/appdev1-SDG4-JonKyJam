import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  isLoggedIn = false;

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
  }
}