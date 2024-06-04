import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostForm } from '../model/post-form.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PostFormService {
    private _httpClient = inject(HttpClient);

    getAllByPostId(postId: number): Observable<HttpResponse<PostForm[]>> {
        let url = `${environment.apiUrl}/post-form/${postId}`;
        return this._httpClient.get<PostForm[]>(url, { observe: 'response' });
    }
}
