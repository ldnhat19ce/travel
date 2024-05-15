import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderModule } from './layout/header/header.module';
import { FooterModule } from './layout/footer/footer.module';
import { TranslateService } from '@ngx-translate/core';
import { LanguageUtil } from './common/utils/language.util';
import { LocalStorageService } from './common/services/local-storage.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderModule,
        FooterModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private _translateService = inject(TranslateService);
    private _localStorageService = inject(LocalStorageService);

    constructor() {

    }

    ngOnInit(): void {
        this._translateService.use(
            LanguageUtil.getLanguage(this._localStorageService)
        );
    }
}
