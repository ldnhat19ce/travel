import { environment } from "../../../../environments/environment";

export class CommonConstant {
    static LOCAL_CURRENT_LANG = "current_lang";
    static LOCAL_USER = "user";

    static LIST_LANGUAGE = [
        { name: "Việt Nam", value: "vn" },
        { name: "English", value: "us" }
    ];

    static BASE_URL = environment.apiUrl;
    static IMAGE_URL = environment.imgUrl;
}
