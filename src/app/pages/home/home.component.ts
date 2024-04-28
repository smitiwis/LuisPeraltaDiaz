import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  inputValueControl: FormControl = new FormControl('');
  valueChangesSubscription!: Subscription;

  inputValue: string = '';

  // SEÑALES
  productNameSearch = signal<string>('');

  constructor() {}

  ngOnInit(): void {
    this.valueChangesSubscription = this.inputValueControl.valueChanges
      .pipe(debounceTime(350))
      .subscribe((value) => {
        this.productNameSearch.set(value);
      });
  }
}
