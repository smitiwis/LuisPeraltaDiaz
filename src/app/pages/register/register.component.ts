import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERROR_MESSAGES } from '../../components/fields/input-bk/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  miFormulario!: FormGroup;
  errorMessages = ERROR_MESSAGES;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.miFormulario = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/-lp$/)]],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', [Validators.required, Validators.pattern('https?://.+')]],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.miFormulario.valid) {
      return this.markAllControlsTouched(this.miFormulario);
    }

    console.log(this.miFormulario.value);
  }

  markAllControlsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllControlsTouched(control); // Recursivamente para formGroups anidados
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.miFormulario.get(controlName);
    if (control && control.invalid && control.touched) {
      const errorKeys = Object.keys(control.errors || {}) as Array<string>;
      const firstErrorKey = errorKeys[0];
      if (firstErrorKey) {
        return this.errorMessages[controlName][firstErrorKey];
      }
    }
    return '';
  }
}
