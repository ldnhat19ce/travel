import { Component, OnInit } from '@angular/core';
import { LanguageUtil } from '../../common/utils/language.util';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    currentLang: string = LanguageUtil.getLanguage();

    constructor() {}

    ngOnInit(): void {
        console.log(this.currentLang)
    }
}
