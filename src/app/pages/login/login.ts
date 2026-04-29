import { Component, OnInit, inject } from '@angular/core';  // ✅ add OnInit, inject
import { CommonModule } from '@angular/common';
import { EducationService } from '../../services/education.service';
import { BookSearchResponse } from '../../models/book.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {  // ✅ keep "Login", add OnInit

  private educationService = inject(EducationService);  // ✅ inject service

  books: any[] = [];      // ✅ replaces the old "boxes" array
  current = 0;
  isLoading = true;

  ngOnInit(): void {
    this.educationService.searchBooks('education').subscribe({
      next: (res: BookSearchResponse) => {
        this.books = res.docs.slice(0, 9);
        this.current = Math.floor(this.books.length / 2);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  getClass(i: number): string {
    const d = Math.abs(i - this.current);
    if (d === 0) return 'active';
    if (d === 1) return 'adjacent';
    return 'far';
  }

  getSize(i: number): number {
    const d = Math.abs(i - this.current);
    if (d === 0) return 140;
    if (d === 1) return 100;
    return 72;
  }

  getCover(book: any): string {
    return book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : 'https://via.placeholder.com/100x150?text=No+Cover';
  }

  setCurrent(i: number): void { this.current = i; }
  prev(): void { if (this.current > 0) this.current--; }
  next(): void { if (this.current < this.books.length - 1) this.current++; }
}