import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../../services/post.service';
import { ValidationUtil } from '../../../../utils/validation.util';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from '../../../../services/category.service';
import { LanguageUtil } from '../../../../utils/language.util';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { Category } from '../../../../model/category.model';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../services/seo.service';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-post-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: './post-list.component.html',
    styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
    private _activatedRoute = inject(ActivatedRoute);
    private _postService = inject(PostService);
    private _categoryService = inject(CategoryService);
    private _router = inject(Router);
    private _localStorageService = inject(LocalStorageService);
    private _seoService = inject(SeoService);

    currentLang: string = 'vn';
    imageUrl: string = environment.imgUrl;

    category: Category = {} as Category;

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._activatedRoute.params.subscribe((route) => {
            if (ValidationUtil.isNotNullAndNotUndefined(route['id'])) {
                this._categoryService.getById(route["id"]).subscribe({
                    next: (res) => {
                        if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                            this.category = res.body || ({} as Category);

                            this._seoService.setMetaTitle("Herotraveldn - " + this.category.name);
                            this._seoService.setMetaDescription(this.category.name);
                            this._seoService.setMetaOgTitle("Herotraveldn - " + this.category.name);
                            this._seoService.setMetaOgDescription(this.category.name);
                            this._seoService.setMetaTwitterTitle("Herotraveldn - " + this.category.name);
                            this._seoService.setMetaTwitterDescription(this.category.name);
                            this._seoService.setMetaOgUrl("https://herotraveldn.com/post/list/" + this.category.id + "/" + route["content"]);
                            // this._seoService.setMetaOgImage(environment.imgUrl + this.category.topImage);
                            // this._seoService.setMetaTwitterImage(environment.imgUrl + this.post.topImage);
                            this._seoService.updateCanonicalLink("https://herotraveldn.com/post/list/" + this.category.id + "/" + route["content"]);
                        }
                    },
                    error: (err: HttpErrorResponse) => {
                        this._router.navigateByUrl("**");
                    }
                });
            }
        });
    }
}
