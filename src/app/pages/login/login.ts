import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

boxes = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
current = Math.floor(this.boxes.length / 2);

getClass(i: number): string {
  const d = Math.abs(i - this.current);
  if (d === 0) return 'active';
  if (d === 1) return 'adjacent';
  return 'far';
}

getSize(i: number): number {
  const d = Math.abs(i - this.current);
  if (d === 0) return 140;
  if (d === 1) return 100;
  return 72;
}

setCurrent(i: number): void {
  this.current = i;
}

prev(): void {
  if (this.current > 0) this.current--;
}

next(): void {
  if (this.current < this.boxes.length - 1) this.current++;
}

// Optional: keyboard support — add to ngOnInit()
// @HostListener('window:keydown', ['$event'])
// onKey(e: KeyboardEvent) {
//   if (e.key === 'ArrowLeft') this.prev();
//   if (e.key === 'ArrowRight') this.next();
// }
}
