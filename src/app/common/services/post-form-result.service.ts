import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostFormResult } from '../model/post-form-result.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PostFormResultService {
    private _httpClient = inject(HttpClient);

    savePostFormResult(params: {}): Observable<HttpResponse<PostFormResult>> {
        let url = `${environment.apiUrl}/post-form/result`;
        return this._httpClient.post<PostFormResult>(url, params, { observe: 'response' });
    }
}
