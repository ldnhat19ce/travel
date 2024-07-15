import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    private _seoService = inject(SeoService);
    private _platformId = inject(PLATFORM_ID);

    isBrowser: boolean = false;

    ngOnInit(): void {
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
                        el: ".swiper-pagination",
                        clickable: true,
                        renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + (index + 1) + "</span>";
                        },
                    },
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    },
                    modules: [Pagination, Autoplay]
                });
            }
        }
    }
}
