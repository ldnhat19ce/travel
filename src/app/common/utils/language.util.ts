import { inject } from "@angular/core";
import { CommonConstant } from "./constant/common.constant";
import { LocalStorageService } from "../services/local-storage.service";

export class LanguageUtil {


    static getLanguage() {
        let localStorageService = inject(LocalStorageService);
        let currentLang = localStorageService.getItem(CommonConstant.LOCAL_CURRENT_LANG, "vn");
        return currentLang;
    }
}
