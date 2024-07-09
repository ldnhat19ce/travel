import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from '../model/category.model';
import { Observable } from 'rxjs';
import { Data } from '../model/data.model';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private _httpClient = inject(HttpClient);

    getAllCategory(page: number, len: number): Observable<HttpResponse<Data<Category[]>>> {
        let url = `${environment.apiUrl}/category?page=${page}&len=${len}`;
        return this._httpClient.get<Data<Category[]>>(url, { observe: 'response' });
    }

    getById(id: number): Observable<HttpResponse<Category>> {
        let url = `${environment.apiUrl}/category/${id}`;
        return this._httpClient.get<Category>(url, { observe: 'response' });
    }
}
