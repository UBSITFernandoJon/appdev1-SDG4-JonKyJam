import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Fix path if necessary

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  // Services
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Properties
  today = new Date();
  tagline = 'quality education for all — sdg 4';
  returnUrl: string = '';

  ngOnInit() {
    // Catch returnUrl from the AuthGuard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  // Reactive Signal Getter
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    // Usually, clicking a "Login" button takes you to a login page,
    // but if this button performs the login action directly:
    this.authService.login();
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  logout() {
    this.authService.logout();
  }
}