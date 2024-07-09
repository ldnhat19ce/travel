import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../common/services/local-storage.service';
import { CommonConstant } from '../../common/utils/constant/common.constant';
import { CategoryService } from '../../common/services/category.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Error } from '../../common/model/error.model';
import { LanguageUtil } from '../../common/utils/language.util';
import { Category } from '../../common/model/category.model';
import { Data } from '../../common/model/data.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

    private _categoryService = inject(CategoryService);
    private _localStorageService = inject(LocalStorageService);

    categories: Category[] = [] as Category[];
    currentLang: string = "vn";

    constructor() {

    }

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._categoryService.getAllCategory(1, 10).subscribe({
            next: (res: HttpResponse<Data<Category[]>>) => {
                if(res !== null && res !== undefined) {
                    this.categories = res.body?.result || [] as Category[];
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
