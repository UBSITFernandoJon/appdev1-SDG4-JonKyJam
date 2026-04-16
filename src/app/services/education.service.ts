import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BookSearchResponse } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  // Use inject() — NOT constructor injection (required by rubric!)
  private http = inject(HttpClient);

  private baseUrl = 'https://openlibrary.org';

  // Search books by subject relevant to SDG 4
  searchBooks(subject: string): Observable<BookSearchResponse> {
    return this.http
      .get<BookSearchResponse>(
        `${this.baseUrl}/search.json?subject=${subject}&limit=10`
      )
      .pipe(
        catchError((error) => {
          console.error('API Error:', error);
          return throwError(
            () => new Error('Failed to load books. Please try again.')
          );
        })
      );
  }
}