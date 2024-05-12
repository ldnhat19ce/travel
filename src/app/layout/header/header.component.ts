import { Component, OnInit } from '@angular/core';
import { LanguageUtil } from '../../common/utils/language.util';
import { LocalStorageService } from '../../common/services/local-storage.service';
import { CommonConstant } from '../../common/utils/constant/common.constant';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    constructor(private _localStorageService: LocalStorageService
    ) {

    }

    ngOnInit(): void {
    }

    onChangeLanguage(language: string) {
        this._localStorageService.setItem(CommonConstant.LOCAL_CURRENT_LANG, language);
        location.reload();
    }
}
