import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'squeleton',
  templateUrl: './squeleton.component.html',
  styleUrl: './squeleton.component.scss'
})
export class SqueletonComponent {
  @Input() height: number = 42;
  @Input() set width ( value: number | string){
    this.getWidth.set(typeof value === 'string' ? parseInt(value) : value);
  };

  getWidth = signal<number | string>('');
}
