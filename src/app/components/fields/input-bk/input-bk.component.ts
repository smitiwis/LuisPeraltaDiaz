import { Component, forwardRef, Input } from '@angular/core';
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
  @Input() formControlName = '';
  @Input() error = '';
  @Input() type = '';
  @Input() label = '';

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


  // Método para manejar cambios en el input
  handleInputChange(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.writeValue(newValue);
    // this.onTouched();
  }
}
