import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../model/data.model';
import { environment } from '../../../environments/environment';
import { Product } from '../model/product.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private _httpClient = inject(HttpClient);

    getPageProduct(params: {}): Observable<HttpResponse<Data<Product[]>>> {
        let url = `${environment.apiUrl}/product`;
        return this._httpClient.get<Data<Product[]>>(url, { params: params, observe: 'response' });
    }

    getDetailProduct(productCode: string): Observable<HttpResponse<Product>> {
        let url = `${environment.apiUrl}/product/${productCode}`;
        return this._httpClient.get<Product>(url, { observe: 'response' });
    }
}
