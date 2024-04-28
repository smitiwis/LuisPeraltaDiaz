import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // EVENTOS
  inputValueControl: FormControl = new FormControl('');
  inputChangesEvent!: Subscription;
  inputChanges$!: Observable<string>;

  inputValue: string = '';

  // SEÑALES
  productNameSearch = signal<string>('');

  constructor() {}

  ngOnInit(): void {
    this.handleInputToSearch();
  }

  handleInputToSearch(): void {
    this.inputChanges$ = this.inputValueControl.valueChanges;
    this.inputChangesEvent = this.inputChanges$
      .pipe(debounceTime(350))
      .subscribe((value) => {
        this.productNameSearch.set(value.trim());
      });
  }

  // DESTRUCCION DE SUSCRIPCIONES
  ngOnDestroy(): void {
    if (this.inputChangesEvent) {
      this.inputChangesEvent.unsubscribe();
    }
  }
}
