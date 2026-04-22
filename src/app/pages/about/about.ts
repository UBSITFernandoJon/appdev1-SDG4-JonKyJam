import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  sdgFacts = [
    '780 million adults worldwide cannot read or write.',
    'Education is a fundamental human right.',
    '617 million children lack basic literacy skills.',
    'Quality education reduces poverty and inequality.',
    'SDG 4 aims for inclusive and equitable education by 2030.'
  ];

  currentYear = new Date().getFullYear();
}