import {
    Component,
    ElementRef,
    inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { ProductImageService } from '../../../../services/product-image.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../../services/seo.service';
import { ValidationUtil } from '../../../../utils/validation.util';
import { ProductImage } from '../../../../model/product-image.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../model/product.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Fancybox, Carousel } from '@fancyapps/ui';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import { environment } from '../../../../../../environments/environment';
import { LanguageUtil } from '../../../../utils/language.util';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBarcode, faCar, faClock, faLocationDot, faShare } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        FontAwesomeModule
    ],
    host: { class: 'container-fluid' },
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
    private _productImageService = inject(ProductImageService);
    private _productService = inject(ProductService);
    private _activatedRoute = inject(ActivatedRoute);
    private _router = inject(Router);
    private _seoService = inject(SeoService);
    private _platformId = inject(PLATFORM_ID);
    private _localStorageService = inject(LocalStorageService);

    productImage: ProductImage[] = [] as ProductImage[];

    product: Product = {} as Product;

    faBarcode = faBarcode;
    faClock = faClock;
    faLocationDot = faLocationDot;
    faCar = faCar;
    faShare = faShare;

    isBrowser: boolean = false;
    loaded: boolean = false;

    imageUrl: string = environment.imgUrl;
    currentLang: string = 'vn';

    ngOnInit(): void {
        this.isBrowser = isPlatformBrowser(this._platformId);
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._activatedRoute.params.subscribe((route) => {
            if (ValidationUtil.isNotNullAndNotUndefined(route['productCode'])) {
                this._productService
                    .getDetailProduct(route['productCode'])
                    .subscribe({
                        next: (res) => {
                            if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                                this.product = res.body || ({} as Product);

                                this._seoService.setMetaTitle(
                                    'Herotraveldn - ' + this.product.pdtName
                                );
                                this._seoService.setMetaDescription(
                                    this.product.pdtName
                                );
                                this._seoService.setMetaOgTitle(
                                    'Herotraveldn - ' + this.product.pdtName
                                );
                                this._seoService.setMetaOgDescription(
                                    this.product.pdtName
                                );
                                this._seoService.setMetaTwitterTitle(
                                    'Herotraveldn - ' + this.product.pdtName
                                );
                                this._seoService.setMetaTwitterDescription(
                                    this.product.pdtName
                                );
                                this._seoService.setMetaOgUrl(
                                    'https://herotraveldn.com/product/' +
                                        this.product.pdtCode +
                                        '/' +
                                        route['content']
                                );
                                this._seoService.updateCanonicalUrl(
                                    'https://herotraveldn.com/product/' +
                                        this.product.pdtCode +
                                        '/' +
                                        route['content']
                                );
                                this.getListProductImage(this.product.pdtCode);
                            }
                        },
                        error: (err: HttpErrorResponse) => {
                            this._router.navigateByUrl('**');
                        },
                    });
            }
        });
    }

    private getListProductImage(productCode: string) {
        this._productImageService
            .getListProductImage(productCode)
            .subscribe((res) => {
                if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                    this.productImage = res.body || [];

                    if(this.productImage.length > 0) {
                        let imageLarge = this.productImage.filter(v => v.imageKind === 'LARGE')[0];
                        if(imageLarge !== null && imageLarge !== undefined) {
                            this._seoService.setMetaOgImage(environment.imgUrl + imageLarge.filePath);
                            this._seoService.setMetaTwitterImage(environment.imgUrl + imageLarge.filePath);
                        } else {
                            this._seoService.setMetaOgImage("https://herotraveldn.com/assets/img/logo/logo.png");
                            this._seoService.setMetaTwitterImage("https://herotraveldn.com/assets/img/logo/logo.png");
                        }
                    }

                    if (this.isBrowser) {
                        let myCarousel = document.getElementById('productCarousel');

                        if (myCarousel !== null && myCarousel !== undefined) {
                            new Carousel(
                                myCarousel,
                                {
                                    infinite: false,
                                    Dots: false,
                                    Thumbs: {
                                        type: 'classic',
                                        Carousel: {
                                            slidesPerPage: 1,
                                            Navigation: true,
                                            center: true,
                                            fill: true,
                                            dragFree: true,
                                        },
                                    },
                                },
                                {
                                    Thumbs,
                                }
                            );
                        }

                        Fancybox.bind('[data-fancybox="gallery"]', {
                            idle: false,
                            compact: false,
                            dragToClose: false,

                            animated: false,
                            showClass: 'f-fadeSlowIn',
                            hideClass: false,

                            Carousel: {
                                infinite: false,
                            },

                            Images: {
                                zoom: false,
                                Panzoom: {
                                    maxScale: 1.5,
                                },
                            },

                            Toolbar: {
                                absolute: true,
                                display: {
                                    left: [],
                                    middle: [],
                                    right: ['close'],
                                },
                            },

                            Thumbs: {
                                type: 'classic',
                                Carousel: {
                                    axis: 'x',

                                    slidesPerPage: 1,
                                    Navigation: true,
                                    center: true,
                                    fill: true,
                                    dragFree: true,

                                    breakpoints: {
                                        '(min-width: 640px)': {
                                            axis: 'y',
                                        },
                                    },
                                },
                            },
                        });

                        this.loaded = true;
                    }
                }
            });
    }
}
