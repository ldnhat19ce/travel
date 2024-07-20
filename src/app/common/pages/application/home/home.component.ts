import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { Product } from '../../../model/product.model';
import { ProductService } from '../../../services/product.service';
import { ValidationUtil } from '../../../utils/validation.util';
import { environment } from '../../../../../environments/environment';
import { faArrowRight, faCar, faClock, faCompass, faGlobe, faHotel, faLocationDot, faMoneyCheckDollar, faPlane, faPlusSquare, faTag, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    private _seoService = inject(SeoService);
    private _platformId = inject(PLATFORM_ID);
    private _productService = inject(ProductService);

    isBrowser: boolean = false;

    products: Product[] = [] as Product[];
    productTour1: Product[] = [] as Product[];
    productTour2: Product[] = [] as Product[];
    productTour3: Product[] = [] as Product[];

    product: Product = {} as Product;

    imageUrl: string = environment.imgUrl;

    faMoneyCheckDollar = faMoneyCheckDollar;
    faTag = faTag;
    faClock = faClock;
    faLocationDot = faLocationDot;
    faCar = faCar;
    faArrowRight = faArrowRight;
    faPlusSquare = faPlusSquare;
    faPlane = faPlane;
    faHotel = faHotel;
    faGlobe = faGlobe;
    faCompass = faCompass;
    faUser = faUser;

    ngOnInit(): void {
        this.getTicketProduct();
        this.getProductTour1();
        this.getProductTour2();
        this.getProductTour3();
        this.getDetailProduct();

        this.isBrowser = isPlatformBrowser(this._platformId);

        this._seoService.setMetaTitle(
            'Herotraveldn - Dịch vụ du lịch Huế - Đà Nẵng - Hội An'
        );
        this._seoService.setMetaDescription(
            'Herotraveldn Chuyên tổ chức các Tour du lịch Miền Trung, Du lịch Đà Nẵng, Tour Du lịch hằng ngày Bà Nà, Hội An, Cù Lao Chàm.'
        );
        this._seoService.setMetaOgTitle(
            'Herotraveldn - Dịch vụ du lịch Huế - Đà Nẵng - Hội An'
        );
        this._seoService.setMetaOgDescription(
            'Herotraveldn Chuyên tổ chức các Tour du lịch Miền Trung, Du lịch Đà Nẵng, Tour Du lịch hằng ngày Bà Nà, Hội An, Cù Lao Chàm.'
        );
        this._seoService.setMetaTwitterTitle(
            'Herotraveldn - Dịch vụ du lịch Huế - Đà Nẵng - Hội An'
        );
        this._seoService.setMetaTwitterDescription(
            'Herotraveldn Chuyên tổ chức các Tour du lịch Miền Trung, Du lịch Đà Nẵng, Tour Du lịch hằng ngày Bà Nà, Hội An, Cù Lao Chàm.'
        );
        this._seoService.setMetaOgUrl('https://herotraveldn.com/');
        this._seoService.setMetaOgImage(
            'https://herotraveldn.com/assets/img/logo/logo.png'
        );
        this._seoService.setMetaTwitterImage(
            'https://herotraveldn.com/assets/img/logo/logo.png'
        );
        this._seoService.updateCanonicalUrl('https://herotraveldn.com/');

        if (this.isBrowser) {
            const container = document.getElementById('homeBanner');
            if (container !== null && container !== undefined) {
                const swiper = new Swiper(container, {
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return (
                                '<span class="' +
                                className +
                                '">' +
                                (index + 1) +
                                '</span>'
                            );
                        },
                    },
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    modules: [Pagination, Autoplay],
                });
            }

            setTimeout(() => {
                const productSwiper = document.getElementById('productSwiper');
                if (productSwiper !== null && productSwiper !== undefined) {
                    const swiper = new Swiper(productSwiper, {
                        grabCursor: true,
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        keyboard: {
                            enabled: true,
                        },
                        spaceBetween: 60,
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        autoplay: {
                            delay: 3000
                        },
                        modules: [Pagination, Autoplay, Keyboard],
                    });
                }
            });

        }
    }

    private getTicketProduct() {
        this._productService.getPageProduct({
            page: 1,
            len: 10,
            categoryId: 2,
            type: '0'
        }).subscribe(res => {
            if(ValidationUtil.isNotNullAndNotUndefined(res)) {
                this.products = res.body?.result || [];
            }
        });
    }

    private getProductTour1() {
        this._productService.getPageProduct({
            page: 1,
            len: 8,
            zoneCode: '01A10'
        }).subscribe(res => {
            if(ValidationUtil.isNotNullAndNotUndefined(res)) {
                this.productTour1 = res.body?.result || [];
            }
        });
    }

    private getProductTour2() {
        this._productService.getPageProduct({
            page: 1,
            len: 8,
            zoneCode: '01A20'
        }).subscribe(res => {
            if(ValidationUtil.isNotNullAndNotUndefined(res)) {
                this.productTour2 = res.body?.result || [];
            }
        });
    }

    private getProductTour3() {
        this._productService.getPageProduct({
            page: 1,
            len: 8,
            zoneCode: '01A30'
        }).subscribe(res => {
            if(ValidationUtil.isNotNullAndNotUndefined(res)) {
                this.productTour3 = res.body?.result || [];
            }
        });
    }

    private getDetailProduct() {
        this._productService.getDetailProduct("01000001").subscribe(res => {
            if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                this.product = res.body || ({} as Product);
            }
        });
    }
}
