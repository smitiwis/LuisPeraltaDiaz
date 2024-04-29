import { Component, Input, ViewChild, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {
  Observable,
  Subscription,
  catchError,
  debounceTime,
  map,
  of,
} from 'rxjs';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { ERROR_MESSAGES } from '@components/fields/input-bk/constants';
import { ProductService } from '@services/services.service';
import { Product_I } from '@interfaces/products';
import { formatDateHelper } from '@helpers/date';

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
  productExistEvent!: Subscription;
  existProduct$!: Observable<HttpResponse<boolean>>;
  inputIdEvent!: Subscription;
  inputId$!: Observable<string>;

  // FORMULARIO
  formProduct!: FormGroup;
  errorMessages = ERROR_MESSAGES;

  // SEÑALES
  loadingForm = signal(false);
  loadginButton = signal(false);
  isFormToEdit = signal(false);
  focusFirtInput = signal(false);
  focusSecondInput = signal(false);
  focusInput = signal(false);
  messageErrorInputId = signal('');

  // INYECCION DE DEPENDENCIAS
  formBuilder = inject(FormBuilder);
  productService = inject(ProductService);
  router = inject(Router);

  ngOnInit(): void {
    this.initForm();
    this.subscribeToInputId();
  }

  subscribeToInputId(): void {
    const idControl = this.formProduct.get('id');

    if (idControl) {
      this.inputId$ = idControl.valueChanges.pipe(
        map((id: string) => {
          this.messageErrorInputId.set('');
          return id;
        }),
        debounceTime(1000)
      );

      this.inputIdEvent = this.inputId$.subscribe((id: string) => {
        if (!this.isFormToEdit() && id.length > 3) {
          this.existProductById(id);
        }
      });
    }
  }

  existProductById(id: string): void {
    this.existProduct$ = this.productService.existProductById(id);
    this.productExistEvent = this.existProduct$
      .pipe(catchError((err) => of(err)))
      .subscribe((resp) => {
        if (resp.status === 200) {
          const existProduct = resp.body;
          const getMessageError = this.getErrorMessage('id', existProduct);
          this.messageErrorInputId.set(getMessageError);
        } else {
          this.modalError.text = '';
          this.modalError.fire();
        }
        this.productExistEvent.unsubscribe();
      });
  }

  onSubmit() {
    if (!this.formProduct.valid) {
      return this.markAllControlsTouched(this.formProduct);
    }
    
    const data = this.formProduct.value;
    this.loadginButton.set(true);
    if (this.isFormToEdit()) {
      this.product$ = this.productService.updateProduct(data);
      this.productEvent = this.product$
        .pipe(catchError((err) => of(err)))
        .subscribe((resp) => {
          this.loadginButton.set(false);
          if (resp.status === 200) {
            this.modalCreateSuccess.fire();
            this.modalUpdateSuccess.fire().then(() => {
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
          this.loadginButton.set(false);
          if (resp.status === 200) {
            this.modalCreateSuccess.fire();
            this.modalCreateSuccess.fire().then(() => {
              this.router.navigate(['/']);
            });
          } else {
            this.modalError.text = resp.error;
            this.modalError.fire();
          }
        });
    }
  }

  initForm(): void {
    this.formProduct = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern(/^[^\s]*$/),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: [
        'https://',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
      date_release: [
        '',
        Validators.required,
        this.customDateReleaseValidator(),
      ],
      date_revision: ['', Validators.required],
    });
  }

  customDateReleaseValidator(): ValidatorFn {
    return (
      formGroup: AbstractControl
    ): Observable<ValidationErrors | null> => {
      const dateReleaseControl = formGroup;

      if (!dateReleaseControl) return of(null);
      if (!dateReleaseControl.value) return of(null);

      const currentDate = new Date();
      const selectedDate = new Date(dateReleaseControl.value);
      selectedDate.setDate(selectedDate.getDate() + 1);

      const dateToRevision = new Date(selectedDate);
      dateToRevision.setFullYear(dateToRevision.getFullYear() + 1);
      dateToRevision.setDate(dateToRevision.getDate() - 1);

      this.formProduct.patchValue({
        date_revision: formatDateHelper(dateToRevision),
      });

      if (selectedDate < currentDate) {
        return of({ invalidDate: true });
      }

      return of(null);
    };
  }

  cargarDatosEnFormulario(datos: Product_I): void {
    this.formProduct.patchValue({
      id: datos.id,
      name: datos.name,
      description: datos.description,
      logo: datos.logo,
      date_release: formatDateHelper(datos.date_release),
      date_revision: formatDateHelper(datos.date_revision),
    });
  }

  markAllControlsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllControlsTouched(control);
      }
    });
  }

  getErrorMessage(controlName: string, manual = false): string {
    const control = this.formProduct.get(controlName);

    if (control && control.invalid && control.touched) {
      const errorKeys = Object.keys(control.errors || {}) as Array<string>;
      const firstErrorKey = errorKeys[0];
      if (firstErrorKey) {
        return this.errorMessages[controlName][firstErrorKey];
      }
    }

    if (manual) {
      return this.errorMessages[controlName]['exist'];
    }
    return '';
  }

  resetForm(): void {
    this.formProduct.patchValue({
      id: this.isFormToEdit() ? this.formProduct.value.id : '',
      name: '',
      description: '',
      logo: 'https://',
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
    if (this.inputIdEvent) {
      this.inputIdEvent.unsubscribe();
    }
  }
}
