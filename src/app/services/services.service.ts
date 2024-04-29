import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product_I } from '../interfaces/products';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.API_PRODUCT;

  constructor(private http: HttpClient) {}

  createProduct(body: Product_I): Observable<Product_I> {
    return this.http.post<Product_I>(this.url, body);
  }

  getProducts(): Observable<HttpResponse<Product_I[]>> {
    return this.http.get<Product_I[]>(this.url, {
      observe: 'response',
    });
  }

  updateProduct(body: Product_I): Observable<Product_I> {
    return this.http.put<Product_I>(this.url, body);
  }

  deleteProductById(id: string): Observable<HttpResponse<Product_I[]>> {
    return this.http.delete<Product_I[]>(`${this.url}?id=${id}`, {
      observe: 'response',
    });
  }
}
