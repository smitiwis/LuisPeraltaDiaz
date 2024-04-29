import { Component, Input, ViewChild, inject, signal } from '@angular/core';
import { Product_I } from '../../interfaces/products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERROR_MESSAGES } from '../fields/input-bk/constants';
import { ProductService } from '../../services/services.service';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { formatDateHelper } from '../../helpers/date';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  providers: [ProductService],
})
export class FormProductComponent {
  // ENTRADAS Y SALIDAS DEL COMPONENTE
  @ViewChild('modalCreateSuccessRef') modalCreateSuccess!: SwalComponent;
  @ViewChild('modalErrorRef') modalError!: SwalComponent;
  @ViewChild('modalUpdateSuccessRef') modalUpdateSuccess!: SwalComponent;

  @Input() set productToEdit(value: Product_I | null) {
    if (value !== null) {
      this.isFormToEdit.set(true);
      this.cargarDatosEnFormulario(value);
    }
  }

  @Input() set loadgin(value: boolean) {
    this.loadingForm.set(value);
  }

  // EVENTOS
  productEvent!: Subscription;
  product$!: Observable<HttpResponse<Product_I>>;

  // FORMULARIO
  miFormulario!: FormGroup;
  errorMessages = ERROR_MESSAGES;

  // SEÑALES
  loadingForm = signal(false);
  isFormToEdit = signal(false);
  focusFirtInput = signal(false);
  focusSecondInput = signal(false);
  focusInput = signal(false);

  // INYECCION DE DEPENDENCIAS
  formBuilder = inject(FormBuilder);
  productService = inject(ProductService);
  router = inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (!this.miFormulario.valid) {
      return this.markAllControlsTouched(this.miFormulario);
    }
    const data = this.miFormulario.value;

    if (this.isFormToEdit()) {
      this.product$ = this.productService.updateProduct(data);
      this.productEvent = this.product$
        .pipe(catchError((err) => of(err)))
        .subscribe((resp) => {
          if (resp.status === 200) {
            this.modalCreateSuccess.fire();
            this.modalUpdateSuccess.fire().then((result) => {
              this.router.navigate(['/']);
            });
          } else {
            this.modalError.text = resp.error;
            this.modalError.fire();
          }
        });
    } else {
      this.product$ = this.productService.createProduct(data);
      this.productEvent = this.product$
        .pipe(catchError((err) => of(err)))
        .subscribe((resp) => {
          if (resp.status === 200) {
            this.modalCreateSuccess.fire();
            this.modalCreateSuccess.fire().then((result) => {
              this.router.navigate(['/']);
            });
          } else {
            this.modalError.text = resp.error;
            this.modalError.fire();
          }
        });
    }
  }

  protected initForm(): void {
    this.miFormulario = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/-lp$/)]],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', [Validators.required, Validators.pattern('https?://.+')]],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required],
    });
  }

  protected cargarDatosEnFormulario(datos: Product_I): void {
    this.miFormulario.patchValue({
      id: datos.id,
      name: datos.name,
      description: datos.description,
      logo: datos.logo,
      date_release: formatDateHelper(datos.date_release),
      date_revision: formatDateHelper(datos.date_revision),
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
      id: this.isFormToEdit() ? this.miFormulario.value.id : '',
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });

    if (this.isFormToEdit()) {
      this.focusSecondInput.set(true);
    } else {
      this.focusFirtInput.set(true);
    }
  }

  // ======== [DESUSCRIBIRSE DE LOS OBSERVABLES] ========
  ngOnDestroy(): void {
    if (this.productEvent) {
      this.productEvent.unsubscribe();
    }
  }
}
