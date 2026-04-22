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
  Mission = [
    'As JONKYJAM, a group of students from Baguio City, our mission is to create and maintain an educational website that offers free access to books and learning materials. We aim to support students in their studies by making education more convenient, inclusive, and available anytime and anywhere.'

  ];

  Vision = [
    'To become a reliable and accessible educational platform that empowers students by providing free and quality learning resources, helping them achieve academic success and lifelong learning.'
    
  ];

  currentYear = new Date().getFullYear();
}