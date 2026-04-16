import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../services/education.service';

import { Book } from '../../models/book.model';
import { Observable, of } from 'rxjs';
import { BookCardComponent } from '../../components/book-card/book-card';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})



export class DashboardComponent {

  private educationService = inject(EducationService);

  // Angular Signals (required by rubric!)
  selectedBook = signal<Book | null>(null);
  totalBooks = signal<number>(0);

  // Computed signal — automatically updates when totalBooks changes
  bookSummary = computed(() =>
    `You have ${this.totalBooks()} books loaded.`
  );

  // Effect — runs whenever selectedBook changes
  constructor() {
    effect(() => {
      if (this.selectedBook()) {
        console.log('Selected book changed:', this.selectedBook()?.title);
      }
    });
  }

  // Observable for async pipe (required by rubric!)
  books$: Observable<any> = of(null);
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.loadBooks('education');
  }

  loadBooks(subject: string) {
    this.isLoading = true;
    this.errorMessage = '';

    this.books$ = this.educationService.searchBooks(subject);
  }

  // Called when child emits bookSelected event
  onBookSelected(book: Book) {
    this.selectedBook.set(book);   // ← update signal
  }
}