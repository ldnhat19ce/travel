import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationUtil } from '../../../services/validation.util';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../model/post.model';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LanguageUtil } from '../../../utils/language.util';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {

    private _activatedRoute = inject(ActivatedRoute);
    private _postService = inject(PostService);
    private _localStorageService = inject(LocalStorageService);

    post: Post = {} as Post;

    currentLang: string = "vn";

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._activatedRoute.params.subscribe(route => {
            if(ValidationUtil.isNotNullAndNotUndefined(route["id"])) {
                this._postService.getPostByCategoryId(route["id"]).subscribe(res => {
                    if(ValidationUtil.isNotNullAndNotUndefined(res)) {
                        this.post = res.body || {} as Post;
                    }
                });
            }
        });
    }

}
