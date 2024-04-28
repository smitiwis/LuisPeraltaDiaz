import { Component, Input } from '@angular/core';
import { Product_I } from '../../../../interfaces/products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERROR_MESSAGES } from '../../../../components/fields/input-bk/constants';
import { ProductService } from '../../../../services/services.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  providers: [ProductService],
})
export class FormProductComponent {
  @Input() product!: Product_I;
  @Input() loadgin = false;

  miFormulario!: FormGroup;
  errorMessages = ERROR_MESSAGES;

  productEvent!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (!this.miFormulario.valid) {
      return this.markAllControlsTouched(this.miFormulario);
    }

    const data = { ...this.miFormulario.value };

    this.productEvent = this.productService.createProduct(data).subscribe({
      next: (product: Product_I) => {
        console.log(product);
      },
      error: (error: any) => {
        const messageErrorJSON = JSON.stringify({ message: error.error });
        const messageError = JSON.parse(messageErrorJSON);
      },
      complete: () => {
        console.log('Solicitud completada');
      },
    });
  }

  protected markAllControlsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllControlsTouched(control);
      }
    });
  }

  protected initForm(): void {
    this.miFormulario = this.formBuilder.group({
      id: ['id-ejemplo-lp', [Validators.required, Validators.pattern(/-lp$/)]],
      name: ['nombre', Validators.required],
      description: ['description', Validators.required],
      logo: [
        'https://www.google.com',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
      date_release: ['2024-04-21', Validators.required],
      date_revision: ['2024-04-21', Validators.required],
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

  // ======== [DESUSCRIBIRSE DE LOS OBSERVABLES] ========
  ngOnDestroy(): void {
    if (this.productEvent) {
      this.productEvent.unsubscribe();
    }
  }
}
