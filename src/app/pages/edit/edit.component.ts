import { HttpResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product_I } from '../../interfaces/products';
import { ProductService } from '../../services/services.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  // INJECCION DE DEPENDENCIAS
  router = inject(Router);
  route = inject(ActivatedRoute);
  productService = inject(ProductService);

  // SEÑALES
  loading = signal(true);
  productToEdit = signal<Product_I | null>(null);
  productId = signal('');

  // EVENTOS
  productList$!: Observable<HttpResponse<Product_I[]>>;
  productEvent!: Subscription;
  params$!: Observable<Params>;
  paramsEvent!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.getParms();
    this.getProductsService();
  }

  getParms() {
    this.params$ = this.route.params;
    this.paramsEvent = this.params$.subscribe((params) => {
      this.productId.set(params['id']);
    });
  }

  getProductsService() {
    this.productList$ = this.productService.getProducts();
    this.productEvent = this.productList$.subscribe((resp) => {
      this.loading.set(false);
      if (resp.status !== 200) {
        return console.error('Error al obtener productos');
      }

      const getProducts = resp.body?.reverse() || [];
      const findProductToEdit = getProducts.find(
        (product) => product.id === this.productId()
      );
      if (!findProductToEdit) {
        return this.router.navigate(['/']);
      }

      this.productToEdit.set(findProductToEdit);
    });
  }

  // DESTRUCCION DE SUSCRIPCIONES
  ngOnDestroy(): void {
    if (this.productEvent) {
      this.productEvent.unsubscribe();
    }

    if (this.paramsEvent) {
      this.paramsEvent.unsubscribe();
    }
  }
}
