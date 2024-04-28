import { Component, inject, signal } from '@angular/core';

import { COLUMNS_LIST, NUM_ROWS_SQUELETON } from '../../../../constants/table-list';
import { ProductService } from '../../../../services/services.service';
import { Product_I } from '../../../../interfaces/products';
import { Observable, Subscription, catchError, delay } from 'rxjs';
import { formatDateHelper } from '../../../../helpers/date';
import { HttpEvent, HttpEventType, HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'table-list',
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
  providers: [ProductService],
})
export class TableListComponent {
  // CONSTANTES
  COLUMNS = COLUMNS_LIST;
  ROWS = NUM_ROWS_SQUELETON;

  // SEÑALES
  products = signal<Product_I[]>([]);
  loading = signal(true);

  // EVENTOS
  productList$!: Observable<HttpResponse<Product_I[]>>;
  productEvent!: Subscription;

  // INJECTACCION DE DEPENDENCIAS
  productService = inject(ProductService);

  ngOnInit(): void {
    this.productList$ = this.productService.getProducts().pipe(delay(2000));
    this.getProducts();
  }

  getProducts(): void {
    this.productEvent = this.productList$.subscribe((resp)=>{
      this.loading.set(false);
      if (resp.status !== 200) {
        console.error('Error al obtener productos');
        return;
      }
      this.products.set(resp.body || []);
    }); 
  }


  formatDate(dateString: string): string {
    return formatDateHelper(dateString);
  }
}
