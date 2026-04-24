export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
  publisher?: string[];
  language?: string[];
  edition_count?: number;
  number_of_pages_median?: number;
}

export interface BookSearchResponse {
  numFound: number;
  start: number;
  docs: Book[];
}