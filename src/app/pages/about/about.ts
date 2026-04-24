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
  AboutUs = [
    'We are a group of students from Baguio City, proudly known as JONKYJAM. As learners ourselves, we understand the importance of accessible and reliable educational resources in supporting academic growth.',
    'Through this platform, we aim to help students enhance their knowledge, improve their learning experience, and develop a stronger passion for education. JONKYJAM is built with dedication, teamwork, and a shared goal of making learning more accessible for all.',
    'We are committed to continuously improving our website and expanding our collection of educational resources to better serve students and educators.'
  ];


  Mission = [
    'As JONKYJAM, a group of students from Baguio City, our mission is to create and maintain an educational website that offers free access to books and learning materials. We aim to support students in their studies by making education more convenient, inclusive, and available anytime and anywhere.'

  ];

  Vision = [
    'To become a reliable and accessible educational platform that empowers students by providing free and quality learning resources, helping them achieve academic success and lifelong learning.'
    
  ];

  currentYear = new Date().getFullYear();
}