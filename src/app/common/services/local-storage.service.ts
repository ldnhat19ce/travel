import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    isBrowser: boolean = false;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    getItem(key: string, defaultValue: any) {
        if(this.isBrowser) {
            return localStorage.getItem(key) || defaultValue;
        }
        return defaultValue;
    }

    setItem(key: string, value: any): void {
        if (this.isBrowser) {
            localStorage.setItem(key, value);
        }
    }
}
