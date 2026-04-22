import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BookSearchResponse } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private http = inject(HttpClient);
  private baseUrl = 'https://openlibrary.org';

  // Search by subject (default)
  searchBooks(subject: string): Observable<BookSearchResponse> {
    return this.http
      .get<BookSearchResponse>(
        `${this.baseUrl}/search.json?subject=${subject}&limit=12`
      )
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Failed to load books. Please try again.')
          );
        })
      );
  }

  // Search by title or keyword
  searchByQuery(query: string): Observable<BookSearchResponse> {
    return this.http
      .get<BookSearchResponse>(
        `${this.baseUrl}/search.json?q=${query}&limit=12`
      )
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Failed to search books. Please try again.')
          );
        })
      );
  }
}