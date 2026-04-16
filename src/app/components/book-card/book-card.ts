import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCardComponent {

  @Input() book!: Book;           // ← receives book from parent
  @Output() bookSelected = new EventEmitter<Book>(); // ← sends book to parent

  onSelect() {
    this.bookSelected.emit(this.book); // ← emit to parent when clicked
  }

  getCoverUrl(): string {
    if (this.book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${this.book.cover_i}-M.jpg`;
    }
    return 'https://via.placeholder.com/150x200?text=No+Cover';
  }
}