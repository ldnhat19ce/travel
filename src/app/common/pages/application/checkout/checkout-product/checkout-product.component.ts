import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../model/product.model';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidationUtil } from '../../../../utils/validation.util';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { LanguageUtil } from '../../../../utils/language.util';
import { environment } from '../../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { NormalizeViPipe } from '../../../../pipe/normalize-vi.pipe';

@Component({
    selector: 'app-checkout-product',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        NormalizeViPipe
    ],
    templateUrl: './checkout-product.component.html',
    styleUrl: './checkout-product.component.scss',
})
export class CheckoutProductComponent implements OnInit {
    private _productService = inject(ProductService);
    private _activatedRoute = inject(ActivatedRoute);
    private _router = inject(Router);
    private _localStorageService = inject(LocalStorageService);

    product: Product = {} as Product;

    loaded: boolean = false;

    imageUrl: string = environment.imgUrl;
    currentLang: string = 'vn';

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._activatedRoute.params.subscribe((route) => {
            if (ValidationUtil.isNotNullAndNotUndefined(route['pdtCode'])) {
                this._productService
                .getDetailProduct(route['pdtCode'])
                .subscribe({
                    next: (res) => {
                        if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                            this.product = res.body || ({} as Product);
                            this.loaded = true;
                        }
                    },
                    error: (err: HttpErrorResponse) => {
                        this._router.navigateByUrl('**');
                    },
                });
            }
        });
    }
}
