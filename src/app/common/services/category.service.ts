import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from '../model/category.model';
import { Response } from '../model/response.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private _httpClient = inject(HttpClient);

    constructor() {}

    getAllCategory(page: number, len: number): Observable<HttpResponse<Response<Category[]>>> {
        let url = `${environment.apiUrl}/category?page=${page}&len=${len}`;
        return this._httpClient.get<Response<Category[]>>(url, { observe: 'response' });
    }
}
