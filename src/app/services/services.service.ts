import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product_I } from '../interfaces/products';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  headers = new HttpHeaders({ authorId: environment.AUTHOR_ID });
  url = environment.API_PRODUCT;

  constructor(private http: HttpClient) {}

  createProduct(body: Product_I): Observable<Product_I> {
    const headers = this.headers;
    return this.http.post<Product_I>(this.url, body, { headers });
  }

  getProducts(): Observable<HttpResponse<Product_I[]>> {
    const headers = this.headers;
    return this.http.get<Product_I[]>(this.url, {
      headers,
      observe: 'response',
    });
  }

  updateProduct(body: Product_I): Observable<Product_I> {
    const headers = this.headers;
    return this.http.put<Product_I>(this.url, body, { headers });
  }

  deleteProductById(id: string): Observable<HttpResponse<Product_I[]>> {
    const headers = this.headers;
    return this.http.delete<Product_I[]>(`${this.url}?id=${id}`, {
      headers,
      observe: 'response',
    });
  }
}
