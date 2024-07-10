import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../model/product.model';
import { Category } from '../../../../model/category.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidationUtil } from '../../../../utils/validation.util';
import { SeoService } from '../../../../services/seo.service';
import { CategoryService } from '../../../../services/category.service';
import { environment } from '../../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { LanguageUtil } from '../../../../utils/language.util';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faCar, faClock, faComments, faLink, faLocationDot, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import {Clipboard, ClipboardModule} from '@angular/cdk/clipboard';
import { SnackbarService } from '../../../../services/component/snackbar.service';
import { SnackbarComponent } from '../../../general/snackbar/snackbar.component';
import { NormalizeViPipe } from '../../../../pipe/normalize-vi.pipe';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        ClipboardModule,
        SnackbarComponent,
        NormalizeViPipe
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
    private _productService = inject(ProductService);
    private _activatedRoute = inject(ActivatedRoute);
    private _router = inject(Router);
    private _seoService = inject(SeoService);
    private _categoryService = inject(CategoryService);
    private _localStorageService = inject(LocalStorageService);
    private _clipboard = inject(Clipboard);
    private _snackbarService = inject(SnackbarService);

    faClock = faClock;
    faLocationDot = faLocationDot;
    faCar = faCar;
    faCalendarAlt = faCalendarAlt;
    faThumbsUp = faThumbsUp;
    faComments = faComments;
    faLink = faLink;

    products: Product[] = [] as Product[];

    category: Category = {} as Category;

    loaded: boolean = false;
    show: boolean = false;

    currentLang: string = 'vn';
    imageUrl: string = environment.imgUrl;
    title: string = '';
    description: string = '';

    page: number = 1;
    len: number = 10;

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._activatedRoute.params.subscribe((route) => {
            if (ValidationUtil.isNotNullAndNotUndefined(route['id'])) {
                this._categoryService.getById(route["id"]).subscribe({
                    next: (res) => {
                        if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                            this.category = res.body || ({} as Category);

                            this._seoService.setMetaTitle("Herotraveldn - " + this.category.name);
                            this._seoService.setMetaDescription(this.category.name);
                            this._seoService.setMetaOgTitle("Herotraveldn - " + this.category.name);
                            this._seoService.setMetaOgDescription(this.category.name);
                            this._seoService.setMetaTwitterTitle("Herotraveldn - " + this.category.name);
                            this._seoService.setMetaTwitterDescription(this.category.name);
                            this._seoService.setMetaOgUrl("https://herotraveldn.com/product/list/" + this.category.id + "/" + route["content"]);
                            this._seoService.setMetaOgImage(environment.imgUrl + this.category.imageUrl);
                            this._seoService.setMetaTwitterImage(environment.imgUrl + this.category.imageUrl);
                            this._seoService.updateCanonicalUrl("https://herotraveldn.com/product/list/" + this.category.id + "/" + route["content"]);
                            this.getListProduct();
                            this.loaded = true;
                        }
                    },
                    error: (err: HttpErrorResponse) => {
                        this._router.navigateByUrl("**");
                    }
                });
            }
        });
    }

    copyToClipboard(item: Product) {
        this._clipboard.copy(item.pdtCode);
        this._snackbarService.show("Copy thành công!", 3000);
    }

    private getListProduct() {
        this._productService.getPageProduct(this.getParamProduct()).subscribe(res => {
            if(res !== null && res !== undefined) {
                this.products = res.body?.result || [];
            }
        });
    }

    private getParamProduct() {
        return {
            page: 1,
            limit: 10,
            categoryId: this.category.id
        }
    }
}
