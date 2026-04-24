import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCardComponent {

  @Input() book!: Book;
  @Input() isFavorite: boolean = false;
  @Input() readingStatus: string = '';

  @Output() bookSelected    = new EventEmitter<Book>();
  @Output() toggleFavorite  = new EventEmitter<Book>();
  @Output() addToReading    = new EventEmitter<{book: Book, status: string}>();

  private router = inject(Router);

  onSelect() {
    this.bookSelected.emit(this.book);
    const bookId = this.book.key.replace('/works/', '');
    this.router.navigate(['/resource', bookId], {
      state: { book: this.book }
    });
  }

  onFavorite() {
    this.toggleFavorite.emit(this.book);
  }

  onAddToReading(status: string) {
    this.addToReading.emit({ book: this.book, status });
  }

  getCoverUrl(): string {
    if (this.book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${this.book.cover_i}-M.jpg`;
    }
    return 'https://placehold.co/150x200?text=No+Cover';
  }
}