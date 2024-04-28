import { Component, ElementRef, forwardRef, Input, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-bk',
  templateUrl: './input-bk.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputBkComponent),
      multi: true,
    },
  ],
})
export class InputBkComponent implements ControlValueAccessor {
  @ViewChild('inputRef') inputRef!: ElementRef;

  @Input() formControlName = '';
  @Input() error = '';
  @Input() type = '';
  @Input() label = '';
  @Input() set focus(value: boolean) {
    if (value) {
      this.setFocusInput();
    }
  }
  @Input() set disabled(value: boolean){
    this.disabledInput.set(value);
  };
  @Input() set loading(value: boolean) {
    this.loadingInput.set(value);
  };

  // SIÑALES
  loadingInput = signal(false);
  disabledInput = signal(false);

  protected value: any = '';

  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    // this.onTouched = fn;
  }

  setFocusInput(): void {

    this.inputRef.nativeElement.focus();
  }


  // Método para manejar cambios en el input
  handleInputChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.writeValue(newValue);
    // this.onTouched();
  }
}
