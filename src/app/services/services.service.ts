import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product_I } from '../interfaces/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  headers = new HttpHeaders({ authorId: 428 });
  url = `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products`;

  constructor(private http: HttpClient) {}

  createProduct(body: Product_I): Observable<Product_I> {
    const headers = this.headers;
    return this.http.post<Product_I>(this.url, body, { headers });
  }

  getProducts(): Observable<HttpResponse<Product_I[]>> {
    const headers = this.headers;
    return this.http.get<Product_I[]>(this.url, { headers, observe: 'response'});
  }

  updateProduct(body: Product_I): Observable<Product_I[]> {
    const headers = this.headers;
    return this.http.put<Product_I[]>(this.url, body, { headers });
  }

  deleteProductById(id: string): Observable<Product_I[]> {
    const headers = this.headers;
    return this.http.delete<Product_I[]>(`${this.url}?id=${id}`, { headers });
  }
}
