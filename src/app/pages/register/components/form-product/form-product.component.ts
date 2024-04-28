import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product_I } from '../../../../interfaces/products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERROR_MESSAGES } from '../../../../components/fields/input-bk/constants';
import { ProductService } from '../../../../services/services.service';
import { Subscription } from 'rxjs';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  providers: [ProductService],
})
export class FormProductComponent {
  @ViewChild('deleteSwal') sweetAlert!: SwalComponent;

  @Input() product!: Product_I;
  @Input() loadgin = false;

  productEvent!: Subscription;

  miFormulario!: FormGroup;
  errorMessages = ERROR_MESSAGES;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (!this.miFormulario.valid) {
      return this.markAllControlsTouched(this.miFormulario);
    }

    const data = this.miFormulario.value;
    this.productEvent = this.productService.createProduct(data).subscribe({
      next: (product: Product_I) => {
        this.sweetAlert.title = '¡Producto creado!';
        this.sweetAlert.text = '';
        this.sweetAlert.showConfirmButton = false;
        this.sweetAlert.icon = 'success';
        this.sweetAlert.timer = 1500;
        this.sweetAlert.fire().then((result) => {
          this.router.navigate(['/']);
        });
      },
      error: (error: any) => {
        const message = error.error.includes('duplicate')
          ? "El producto 'ID' ya esta registrado."
          : 'No estas autorizado para realizar esta acción.';

        this.sweetAlert.title = '¡Ups! Algo salió mal.';
        this.sweetAlert.text = message;
        this.sweetAlert.showConfirmButton = true;
        this.sweetAlert.icon = 'error';
        this.sweetAlert.timer = 2000;
        this.sweetAlert.fire();
      },
      complete: () => {
        console.log('Solicitud completada');
      },
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

  protected markAllControlsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllControlsTouched(control);
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

  resetForm(): void {
    this.miFormulario.patchValue({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });
  }

  // ======== [DESUSCRIBIRSE DE LOS OBSERVABLES] ========
  ngOnDestroy(): void {
    if (this.productEvent) {
      this.productEvent.unsubscribe();
    }
  }
}
