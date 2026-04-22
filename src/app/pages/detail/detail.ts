import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class DetailComponent implements OnInit {
openLibraryLink() {
  const url = `https://openlibrary.org${this.book()?.key}`;
  window.open(url, '_blank');
}
  private route  = inject(ActivatedRoute);
  private router = inject(Router);

  // Signals
  book       = signal<Book | null>(null);
  bookId     = signal<string>('');
  notFound   = signal<boolean>(false);

  ngOnInit() {
    // Get :id from URL
    const id = this.route.snapshot.paramMap.get('id');
    this.bookId.set(id ?? '');

    // Get book data passed from Dashboard via router state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { book: Book };

    if (state?.book) {
      this.book.set(state.book);
    } else {
      // If user refreshes page, state is lost
      // Try to get from window.history.state
      const historyState = window.history.state as { book: Book };
      if (historyState?.book) {
        this.book.set(historyState.book);
      } else {
        this.notFound.set(true);
      }
    }
  }

  getCoverUrl(): string {
    const b = this.book();
    if (b?.cover_i) {
      return `https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`;
    }
    return 'https://placehold.co/300x400?text=No+Cover';
  }

  getOpenLibraryUrl(): string {
    return `https://openlibrary.org${this.book()?.key}`;
  }
}