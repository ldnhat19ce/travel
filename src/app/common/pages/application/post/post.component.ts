import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationUtil } from '../../../services/validation.util';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../model/post.model';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LanguageUtil } from '../../../utils/language.util';
import { environment } from '../../../../../environments/environment';
import { PostForm } from '../../../model/post-form.model';
import { PostFormService } from '../../../services/post-form.service';
import { CommonModule } from '@angular/common';
import { ConvertDropdownPipe } from '../../../pipe/convert-dropdown.pipe';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [
        TranslateModule,
        CommonModule,
        ConvertDropdownPipe
    ],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {

    private _activatedRoute = inject(ActivatedRoute);
    private _postService = inject(PostService);
    private _localStorageService = inject(LocalStorageService);
    private _postFormService = inject(PostFormService);

    post: Post = {} as Post;

    postFormList: PostForm[] = [] as PostForm[];

    currentLang: string = "vn";
    imageUrl: string = environment.imgUrl;

    postId: number = 0;

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._activatedRoute.params.subscribe(route => {
            if(ValidationUtil.isNotNullAndNotUndefined(route["id"])) {
                this._postService.getPostByCategoryId(route["id"]).subscribe(res => {
                    if(ValidationUtil.isNotNullAndNotUndefined(res)) {
                        this.post = res.body || {} as Post;
                        this.postId = this.post.id;
                        this.getPostFormList();
                    }
                });
            }
        });
    }

    private getPostFormList() {
        this._postFormService.getAllByPostId(this.postId).subscribe(res => {
            if(ValidationUtil.isNotNullAndNotUndefined(res)) {
                this.postFormList = res.body || [];
            }
        });
    }

}
