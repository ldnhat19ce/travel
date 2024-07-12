import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../model/data.model';
import { Product } from '../model/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductRelationService {
    private _httpClient = inject(HttpClient);

    getPageProductRelation(params: {}): Observable<HttpResponse<Data<Product[]>>> {
        let url = `${environment.apiUrl}/product/relation`;
        return this._httpClient.get<Data<Product[]>>(url, { params: params, observe: 'response' });
    }
}
