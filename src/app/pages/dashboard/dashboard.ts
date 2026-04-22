import { Component, inject, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EducationService } from '../../services/education.service';
import { BookCardComponent } from '../../components/book-card/book-card';
import { Book, BookSearchResponse } from '../../models/book.model';
import { Observable, of, BehaviorSubject, switchMap, catchError, startWith } from 'rxjs';
import { CanComponentDeactivate } from '../../guards/unsaved-changes-guard';
// Wrapper to track loading + data + error
interface LoadingState {
  loading: boolean;
  data: BookSearchResponse | null;
  error: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, CanComponentDeactivate {

  private educationService = inject(EducationService);

  // ── Signals ──────────────────────────────────────
  selectedBook      = signal<Book | null>(null);
  totalSelected     = signal<number>(0);
  hasUnsavedChanges = signal<boolean>(false);
  favorites         = signal<Book[]>([]);
  readingList       = signal<{ book: Book; status: string }[]>([]);

  bookSummary = computed(() =>
    this.totalSelected() === 0
      ? 'No books selected yet.'
      : `You have selected ${this.totalSelected()} book(s) so far.`
  );

  constructor() {
    effect(() => {
      const book = this.selectedBook();
      if (book) {
        this.hasUnsavedChanges.set(true);
      }
    });
  }

  canDeactivate(): boolean {
    return !this.hasUnsavedChanges();
  }

  // ── Search ───────────────────────────────────────
  searchQuery = '';

  // BehaviorSubject holds the current search term
  private searchTerm$ = new BehaviorSubject<string>('education');

  // Single observable that handles loading + data + error
  booksState$: Observable<LoadingState> = this.searchTerm$.pipe(
    switchMap(term => {
      const api$ = term.startsWith('__query__')
        ? this.educationService.searchByQuery(term.replace('__query__', ''))
        : this.educationService.searchBooks(term);

      return api$.pipe(
        // Map success to state
        switchMap(data => of({
          loading: false,
          data,
          error: ''
        })),
        // Show loading first
        startWith({ loading: true, data: null, error: '' }),
        // Handle errors
        catchError(() => of({
          loading: false,
          data: null,
          error: 'Failed to load books. Please try again.'
        }))
      );
    })
  );

  ngOnInit() {
    this.searchTerm$.next('education'); // load default
  }

  // Called when Search button clicked or Enter pressed
  onSearch() {
    if (!this.searchQuery.trim()) {
      this.searchTerm$.next('education');
    } else {
      this.searchTerm$.next('__query__' + this.searchQuery.trim());
    }
  }

  // Reset search
  onReset() {
    this.searchQuery = '';
    this.searchTerm$.next('education');
  }

  onBookSelected(book: Book) {
    this.selectedBook.set(book);
    this.totalSelected.update(n => n + 1);
  }

  // ── Favorites ────────────────────────────────────
  toggleFavorite(book: Book) {
    const current = this.favorites();
    const exists  = current.find(b => b.key === book.key);
    if (exists) {
      this.favorites.set(current.filter(b => b.key !== book.key));
    } else {
      this.favorites.set([...current, book]);
    }
  }

  isFavorite(book: Book): boolean {
    return this.favorites().some(b => b.key === book.key);
  }

  // ── Reading List ─────────────────────────────────
  addToReadingList(book: Book, status: string) {
    const current = this.readingList();
    const exists  = current.find(r => r.book.key === book.key);
    if (exists) {
      this.readingList.set(
        current.map(r =>
          r.book.key === book.key ? { book, status } : r
        )
      );
    } else {
      this.readingList.set([...current, { book, status }]);
    }
  }

  getReadingStatus(book: Book): string {
    return this.readingList()
      .find(r => r.book.key === book.key)?.status ?? '';
  }
}