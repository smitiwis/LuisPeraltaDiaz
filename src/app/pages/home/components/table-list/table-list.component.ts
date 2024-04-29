import { Component, Input, ViewChild, inject, signal } from '@angular/core';

import {
  COLUMNS_LIST,
  NUM_ROWS_SQUELETON,
} from '../../../../constants/table-list';
import { ProductService } from '../../../../services/services.service';
import { Product_I } from '../../../../interfaces/products';
import { Observable, Subscription, catchError, delay, of } from 'rxjs';
import { clearWord, formatDateHelper } from '../../../../helpers/date';
import { HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'table-list',
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
  providers: [ProductService],
})
export class TableListComponent {
  // ENTRADAS
  @ViewChild('modalDeleleProduct') modalToDelete!: SwalComponent;
  @ViewChild('modalToConfirm') modalToConfirm!: SwalComponent;
  @ViewChild('modalError') modalError!: SwalComponent;

  @Input()
  set productNameSearch(value: string) {
    if (!value || value === '') {
      this.productsPerPage(this.constProducts(), this.showNumberProducts());
      return;
    }

    this.wordSearch.set(value);
    const wordSearch = clearWord(value.toLowerCase());
    const filterProducts = this.constProducts().filter(({ name }) => {
      const nameProduct = clearWord(name.toLowerCase());
      return nameProduct.includes(wordSearch);
    });

    this.productsPerPage(filterProducts, this.showNumberProducts());
  }

  // CONSTANTES
  COLUMNS = COLUMNS_LIST;
  ROWS = NUM_ROWS_SQUELETON;
  numberProducts = '10';

  // SEÑALES
  constProducts = signal<Product_I[]>([]);
  products = signal<Product_I[]>([]);
  loading = signal(true);
  showNumberProducts = signal(this.numberProducts);
  wordSearch = signal('');
  productToDelete = signal<Product_I | null>(null);

  // EVENTOS
  productList$!: Observable<HttpResponse<Product_I[]>>;
  productEvent!: Subscription;

  // FORMULARIOS
  selectValueControl: FormControl = new FormControl(this.numberProducts);
  selectValueSubscription!: Subscription;

  // INJECTACCION DE DEPENDENCIAS
  productService = inject(ProductService);
  swalTargets = inject(SwalPortalTargets);

  ngOnInit(): void {
    this.getProducts();
    this.getValueSelect();
  }

  getProducts(): void {
    this.productList$ = this.productService.getProducts();
    this.productEvent = this.productList$.subscribe((resp) => {
      this.loading.set(false);
      if (resp.status !== 200) {
        return console.error('Error al obtener productos');
      }
      const products = resp.body?.reverse() || [];

      this.products.set(products || []);
      this.constProducts.set(products || []);
    });
  }

  formatDate(dateString: string): string {
    return formatDateHelper(dateString);
  }

  productsPerPage(products: Product_I[] | [], value: string) {
    const productsPerPage = products.slice(0, Number(value));
    this.products.set(productsPerPage || []);
  }

  getValueSelect(): void {
    this.selectValueSubscription =
      this.selectValueControl.valueChanges.subscribe((value) => {
        this.showNumberProducts.set(value);
        const filterProducts = this.constProducts().filter(({ name }) => {
          const nameProduct = clearWord(name.toLowerCase());
          return nameProduct.includes(this.wordSearch());
        });

        this.productsPerPage(filterProducts, value);
      });
  }

  descriptionResult(): string {
    if (this.loading()) {
      return 'Calculando...';
    }

    if (this.products().length === 0) {
      return `No se encontraron resultados para "${this.wordSearch()}"`;
    }

    if (this.products().length > 1) {
      return `${this.products().length} resultados`;
    }

    return `${this.products().length} resultado`;
  }

  openModalToDelete(products: Product_I): void {
    this.productToDelete.set(products);
    this.modalToDelete.fire();
  }

  goToDeleteProduct(): any {
    const getProductToDelete = this.productToDelete();
    if (!getProductToDelete) {
      return this.modalToDelete.close();
    }

    this.productService
      .deleteProductById(getProductToDelete.id)
      .pipe(catchError((err) => of(err)))
      .subscribe((resp) => {
        if (resp.status !== 200) {
          this.modalToDelete.close();
          this.modalError.text = resp.error;
          this.modalError.fire();
        } else {
          const newListProducts = this.constProducts().filter(
            (product) => product.id !== getProductToDelete.id
          );

          this.constProducts.set(newListProducts);
          this.productsPerPage(newListProducts, this.showNumberProducts());
          this.modalToDelete.close();
          this.modalToConfirm.fire();
        }
      });
  }

  // DESSUSCRIPCION DE EVENTOS
  ngOnDestroy(): void {
    if (this.productEvent) {
      this.productEvent.unsubscribe();
    }
    if (this.selectValueSubscription) {
      this.selectValueSubscription.unsubscribe();
    }
  }
}
