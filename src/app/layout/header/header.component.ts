import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../common/services/local-storage.service';
import { CommonConstant } from '../../common/utils/constant/common.constant';
import { BookingService } from '../../common/services/booking.service';
import { Booking } from '../../common/model/booking.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Response } from '../../common/model/response.model';
import { Error } from '../../common/model/error.model';
import { LanguageUtil } from '../../common/utils/language.util';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

    private _bookingService = inject(BookingService);
    private _localStorageService = inject(LocalStorageService);

    bookings: Booking[] = [] as Booking[];
    currentLang: string = "vn";

    constructor() {

    }

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._bookingService.getAllCategory(1, 10).subscribe({
            next: (res: HttpResponse<Response<Booking[]>>) => {
                if(res !== null && res !== undefined) {
                    this.bookings = res.body?.data?.result || [] as Booking[];
                }
            },
            error: (err: HttpErrorResponse) => {
                let error: Error = err.error;
            }
        });
    }

    onChangeLanguage(language: string) {
        this._localStorageService.setItem(CommonConstant.LOCAL_CURRENT_LANG, language);
        location.reload();
    }
}
