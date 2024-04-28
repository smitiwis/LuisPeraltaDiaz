import { Component, Input } from '@angular/core';

@Component({
  selector: 'squeleton',
  templateUrl: './squeleton.component.html',
  styleUrl: './squeleton.component.scss'
})
export class SqueletonComponent {
  @Input() height: number = 42;
}
