import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductImage } from '../model/product-image.model';

@Injectable({
    providedIn: 'root',
})
export class ProductImageService {
    private _httpClient = inject(HttpClient);

    getListProductImage(productCode: string): Observable<HttpResponse<ProductImage[]>> {
        let url = `${environment.apiUrl}/product-image/${productCode}`;
        return this._httpClient.get<ProductImage[]>(url, { observe: 'response' });
    }
}
