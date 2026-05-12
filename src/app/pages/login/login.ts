import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../services/education.service';
import { BookSearchResponse } from '../../models/book.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  private educationService = inject(EducationService);
  private router = inject(Router);


  books: any[] = [];
  recommendedBooks: any[] = [];
  genres: string[] = [];
  shelfCurrents: Record<string, number> = {};
  isLoading = true;

  private genreQueries = [
    'fiction',
    'science',
    'history',
    'fantasy',
    'biography',
  ];

  onBookClick(book: any): void {
  const id = book.key?.replace('/works/', '') ?? 'unknown';
  this.router.navigate(['/resource', id], { state: { book } });
}

  ngOnInit(): void {
    const results: Record<string, any[]> = {};
    let completed = 0;

    this.genreQueries.forEach(genre => {
      this.educationService.searchBooks(genre).subscribe({
        next: (res: BookSearchResponse) => {
          results[genre] = res.docs.slice(0, 9).map(book => ({ ...book, genre }));
          completed++;

          if (completed === this.genreQueries.length) {
            this.books = this.genreQueries.flatMap(g => results[g] ?? []);
            this.genres = this.genreQueries;

            // Pick 9 random books from the full pool
            const shuffled = [...this.books].sort(() => Math.random() - 0.5);
            this.recommendedBooks = shuffled.slice(0, 9);

            // Init shelf cursors
            this.shelfCurrents['recommended'] = 0;
            this.genres.forEach(g => this.shelfCurrents[g] = 0);

            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error(`Failed to load genre: ${genre}`, err);
          completed++;
          if (completed === this.genreQueries.length) {
            this.isLoading = false;
          }
        }
      });
    });
  }

  getBooksForGenre(genre: string): any[] {
    if (genre === 'recommended') return this.recommendedBooks;
    return this.books.filter(b => b.genre === genre);
  }

  getCurrentIndex(genre: string): number {
    return this.shelfCurrents[genre] ?? 0;
  }

  setCurrentShelf(genre: string, i: number): void {
    this.shelfCurrents[genre] = i;
  }

  prevShelf(genre: string): void {
    if (this.shelfCurrents[genre] > 0) this.shelfCurrents[genre]--;
  }

  nextShelf(genre: string): void {
    const max = this.getBooksForGenre(genre).length - 1;
    if (this.shelfCurrents[genre] < max) this.shelfCurrents[genre]++;
  }

  getShelfClass(genre: string, i: number): string {
    const curr = this.getCurrentIndex(genre);
    const diff = Math.abs(i - curr);
    if (diff === 0) return 'active';
    if (diff === 1) return 'adjacent';
    return 'far';
  }

  getShelfSize(genre: string, i: number): number {
    const curr = this.getCurrentIndex(genre);
    const diff = Math.abs(i - curr);
    if (diff === 0) return 140;
    if (diff === 1) return 100;
    return 72;
  }

  getCover(book: any): string {
    return book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : 'https://via.placeholder.com/100x150?text=No+Cover';
  }
}