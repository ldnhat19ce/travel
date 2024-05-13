import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Authentication } from '../model/authentication.model';
import { Observable } from 'rxjs';
import { Response } from '../model/response.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private _httpClient = inject(HttpClient);

    constructor() {}

    adminAuthentication(params: {}): Observable<
        HttpResponse<Response<Authentication>>
    > {
        let url = `${environment.apiUrl}/admin/authentication/sign-in`;
        return this._httpClient.post<Response<Authentication>>(url, params, {
            observe: 'response',
        });
    }

    isTokenExpired(expiredTime: number): boolean {
        if (expiredTime) {
            return 1000 * expiredTime - new Date().getTime() < 5000;
        } else {
            return false;
        }
    }
}
