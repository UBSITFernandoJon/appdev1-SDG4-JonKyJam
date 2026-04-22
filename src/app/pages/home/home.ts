import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  today = new Date();
  tagline = 'quality education for all — sdg 4';

  returnUrl: string = '';
  isLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Get returnUrl from guard redirect
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

    // Check login state
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn = true;

    // Redirect back to protected page if exists
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
  }
}