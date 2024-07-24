import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../common/services/local-storage.service';
import { CommonConstant } from '../../common/utils/constant/common.constant';
import { CategoryService } from '../../common/services/category.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Error } from '../../common/model/error.model';
import { LanguageUtil } from '../../common/utils/language.util';
import { Category } from '../../common/model/category.model';
import { Data } from '../../common/model/data.model';
import { faBars, faGlobe, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../common/model/product.model';
import { ProductService } from '../../common/services/product.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    private _productService = inject(ProductService);
    private _categoryService = inject(CategoryService);
    private _localStorageService = inject(LocalStorageService);
    private _router = inject(Router);

    categories: Category[] = [] as Category[];

    currentLang: string = "vn";
    query: string = "";

    faGlobe = faGlobe;
    faSearch = faSearch;
    faBars = faBars;

    products: Product[] = [] as Product[];

    searchControl = new FormControl('');

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

        this.searchControl.valueChanges.subscribe(value => {
            if(value !== null && value !== undefined) {
                this.query = value;
                if(value.length >= 3) {
                    this.getListProduct(value);
                }
            }
        });
    }

    onChangeLanguage(language: string) {
        this._localStorageService.setItem(CommonConstant.LOCAL_CURRENT_LANG, language);
        location.reload();
    }

    onChangeQuery() {
        this.products = [];
        this._router.navigateByUrl("/product/search?query=" + this.query);
    }

    private getListProduct(query: string) {
        this._productService.getPageProduct(this.getParamProduct(query)).subscribe(res => {
            if(res !== null && res !== undefined) {
                this.products = res.body?.result || [];
            }
        });
    }


    private getParamProduct(query: string) {
        return {
            page: 1,
            limit: 5,
            query: query
        }
    }
}
