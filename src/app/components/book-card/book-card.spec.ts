import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCardComponent } from './book-card';
import { Book } from '../../models/book.model';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  // Mock book data
  const mockBook: Book = {
    key: '/works/OL123',
    title: 'Test Book',
    author_name: ['Test Author'],
    first_publish_year: 2020,
    cover_i: undefined
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    component.book = mockBook; // ← pass mock data via @Input
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();         // ✅ component renders
  });

  it('should display the book title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h6')?.textContent)
      .toContain('Test Book');              // ✅ title shows
  });

  it('should emit bookSelected when button is clicked', () => {
    let emittedBook: Book | undefined;
    component.bookSelected.subscribe((book) => emittedBook = book);

    component.onSelect();

    expect(emittedBook).toEqual(mockBook);  // ✅ @Output works
  });

  it('should return placeholder when no cover image', () => {
    const url = component.getCoverUrl();
    expect(url).toContain('placehold.co'); // ✅ fallback image works
  });
});