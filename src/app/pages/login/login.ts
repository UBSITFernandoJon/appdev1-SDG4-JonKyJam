import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Simple credentials
  username = '';
  password = '';
  errorMsg = '';

  onUsernameInput(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
  }

  onPasswordInput(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  onLogin() {
    // Check credentials
    if (this.username === 'admin' && this.password === 'sdg4') {
      this.authService.login();

      // Redirect back to where they came from, or the dashboard
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/dashboard';
      this.router.navigateByUrl(returnUrl);
    } else {
      this.errorMsg = '❌ Invalid username or password. Try admin / sdg4';
    }
  }
}