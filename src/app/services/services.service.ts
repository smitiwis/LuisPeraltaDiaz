import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product_I } from '../interfaces/products';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.API_PRODUCT;

  constructor(private http: HttpClient) {}

  createProduct(body: Product_I): Observable<HttpResponse<Product_I>> {
    return this.http.post<Product_I>(this.url, body, { observe: 'response' });
  }

  getProducts(): Observable<HttpResponse<Product_I[]>> {
    return this.http.get<Product_I[]>(this.url, {
      observe: 'response',
    });
  }

  updateProduct(body: Product_I): Observable<HttpResponse<Product_I>> {
    return this.http.put<Product_I>(this.url, body, { observe: 'response' });
  }

  deleteProductById(id: string): Observable<HttpResponse<Product_I[]>> {
    return this.http.delete<Product_I[]>(`${this.url}?id=${id}`, {
      observe: 'response',
    });
  }

  existProductById(id: string): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(`${this.url}/verification?id=${id}`, {
      observe: 'response',
    });
  }
}
