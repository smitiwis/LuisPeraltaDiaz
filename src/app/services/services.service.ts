import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product_I } from '../interfaces/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(body: Product_I): Observable<Product_I> {
    const headers = new HttpHeaders({ authorId: 428 });
    const url = `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products`;

    return this.http.post<Product_I>(url, body, { headers });
  }
}
