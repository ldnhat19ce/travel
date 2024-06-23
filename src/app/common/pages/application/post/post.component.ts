import { SeoService } from './../../../services/seo.service';
import { PostFormResult } from './../../../model/post-form-result.model';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationUtil } from '../../../utils/validation.util';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../model/post.model';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LanguageUtil } from '../../../utils/language.util';
import { environment } from '../../../../../environments/environment';
import { PostForm } from '../../../model/post-form.model';
import { PostFormService } from '../../../services/post-form.service';
import { CommonModule } from '@angular/common';
import { ConvertDropdownPipe } from '../../../pipe/convert-dropdown.pipe';
import { FormResult } from '../../../model/form-result.model';
import { PostFormResultService } from '../../../services/post-form-result.service';
import { ToastComponent } from '../../general/toast/toast.component';
import { SafeHTMLPipe } from '../../../pipe/safe-html.pipe';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [
        TranslateModule,
        CommonModule,
        ConvertDropdownPipe,
        ToastComponent,
        SafeHTMLPipe
    ],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
    private _activatedRoute = inject(ActivatedRoute);
    private _postService = inject(PostService);
    private _localStorageService = inject(LocalStorageService);
    private _postFormService = inject(PostFormService);
    private _postFormResultService = inject(PostFormResultService);
    private _seoService = inject(SeoService);
    private _router = inject(Router);

    post: Post = {} as Post;

    postFormList: PostForm[] = [] as PostForm[];

    currentLang: string = 'vn';
    imageUrl: string = environment.imgUrl;

    postId: number = 0;

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._activatedRoute.params.subscribe((route) => {
            if (ValidationUtil.isNotNullAndNotUndefined(route['id'])) {
                this._postService
                    .getPostByCategoryId(route['id'])
                    .subscribe({
                        next: (res) => {
                            if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                                this.post = res.body || ({} as Post);
                                this.postId = this.post.id;
                                this._seoService.setMetaTitle(this.post.name);
                                this._seoService.setMetaDescription(this.post.name);
                                this._seoService.setMetaOgTitle(this.post.name);
                                this._seoService.setMetaOgDescription(this.post.name);
                                this._seoService.setMetaTwitterTitle(this.post.name);
                                this._seoService.setMetaTwitterDescription(this.post.name);
                                this._seoService.setMetaOgUrl("https://herotraveldn.com/post/" + this.post.id + "/" + route["content"]);
                                this._seoService.setMetaOgImage(environment.imgUrl + this.post.topImage);
                                this._seoService.setMetaTwitterImage(environment.imgUrl + this.post.topImage);
                                this._seoService.updateCanonicalLink("https://herotraveldn.com/post/" + this.post.id + "/" + route["content"]);
                                this.getPostFormList();
                            }
                        },
                        error: (err: HttpErrorResponse) => {
                            this._router.navigateByUrl("**");
                        }
                    });
            }
        });
    }

    onSubmit() {
        let results: FormResult[] = [];
        this.postFormList.forEach((v) => {
            let element = null;
            let value = '';
            switch (v.fieldType) {
                case 'INPUT':
                    element = <HTMLInputElement>(
                        document.getElementById(v.fieldId)
                    );
                    value = element.value;
                    break;
                case 'DROPDOWN':
                    element = <HTMLSelectElement>(
                        document.getElementById(v.fieldId)
                    );
                    value =
                        document.getElementsByTagName('option')[
                            element.selectedIndex
                        ].label;
                    break;
                case 'TEXT_AREA':
                    element = <HTMLTextAreaElement>(
                        document.getElementById(v.fieldId)
                    );
                    value = element.value;
                    break;
            }
            results.push({
                id: v.fieldId,
                name: v.fieldName,
                value: value,
            });
        });

        this._postFormResultService
            .savePostFormResult({
                postId: this.postId,
                result: JSON.stringify(results),
            })
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    let result = res.body || ({} as PostFormResult);
                    let toast = <HTMLDivElement>(
                        document.getElementById('liveToast')
                    );
                    if (ValidationUtil.isNotNullAndNotUndefined(toast)) {
                        toast.classList.add('show');
                    }
                }
            });
    }

    private getPostFormList() {
        this._postFormService.getLatestByPostId(this.postId).subscribe((res) => {
            if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                this.postFormList = res.body || [];
            }
        });
    }
}
