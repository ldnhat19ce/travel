import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../model/booking.model';

@Injectable({
    providedIn: 'root',
})
export class CheckoutService {
    private _httpClient = inject(HttpClient);

    saveCheckout(params: {}): Observable<HttpResponse<Booking>> {
        let url = `${environment.apiUrl}/booking`;
        return this._httpClient.post<Booking>(url, params, { observe: 'response' });
    }
}
