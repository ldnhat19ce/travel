import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    private _seoService = inject(SeoService);

    ngOnInit(): void {
        this._seoService.setMetaTitle("Herotraveldn - Dịch vụ du lịch Huế - Đà Nẵng - Hội An");
        this._seoService.setMetaDescription("Herotraveldn Chuyên tổ chức các Tour du lịch Miền Trung, Du lịch Đà Nẵng, Tour Du lịch hằng ngày Bà Nà, Hội An, Cù Lao Chàm.");
        this._seoService.setMetaOgTitle("Herotraveldn - Dịch vụ du lịch Huế - Đà Nẵng - Hội An");
        this._seoService.setMetaOgDescription("Herotraveldn Chuyên tổ chức các Tour du lịch Miền Trung, Du lịch Đà Nẵng, Tour Du lịch hằng ngày Bà Nà, Hội An, Cù Lao Chàm.");
        this._seoService.setMetaTwitterTitle("Herotraveldn - Dịch vụ du lịch Huế - Đà Nẵng - Hội An");
        this._seoService.setMetaTwitterDescription("Herotraveldn Chuyên tổ chức các Tour du lịch Miền Trung, Du lịch Đà Nẵng, Tour Du lịch hằng ngày Bà Nà, Hội An, Cù Lao Chàm.");
        this._seoService.setMetaOgUrl("https://herotraveldn.com/assets/img/logo/logo.png");
        this._seoService.setMetaOgImage("https://herotraveldn.com/assets/img/logo/logo.png");
        this._seoService.setMetaTwitterImage("https://herotraveldn.com/assets/img/logo/logo.png");
        this._seoService.updateCanonicalUrl("https://herotraveldn.com/");
    }
}
