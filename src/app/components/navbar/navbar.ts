import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {

  private authService = inject(AuthService);
  private router      = inject(Router);

  isDarkMode = signal<boolean>(false);

  // Expose to template
  isLoggedIn = this.authService.isLoggedIn;

  ngOnInit() {
    this.authService.checkAuthStatus();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleDarkMode() {
    this.isDarkMode.update(v => !v);
    if (this.isDarkMode()) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}