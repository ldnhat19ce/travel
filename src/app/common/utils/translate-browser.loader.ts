import { HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable } from 'rxjs';

export class TranslateBrowserLoader implements TranslateLoader {
    constructor(private http: HttpClient) {}

    public getTranslation(lang: string): Observable<unknown> {
        return new TranslateHttpLoader(this.http).getTranslation(lang);
    }
}

export function translateBrowserLoaderFactory(
    httpClient: HttpClient
): TranslateBrowserLoader {
    return new TranslateBrowserLoader(httpClient);
}

export function httpTranslateLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/message_', '.json');
}

export function httpBackendTranslateLoaderFactory(http: HttpBackend) {
    return new TranslateHttpLoader(new HttpClient(http), './assets/i18n/message_', '.json');
}
