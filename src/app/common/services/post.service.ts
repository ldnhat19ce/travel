import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private _httpClient = inject(HttpClient);

    getPostByCategoryId(id: number): Observable<HttpResponse<Post>> {
        let url = `${environment.apiUrl}/post/category/${id}`;
        return this._httpClient.get<Post>(url, { observe: 'response' });
    }
}
