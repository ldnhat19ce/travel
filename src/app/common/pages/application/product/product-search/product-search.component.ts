import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../model/product.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faClock, faLocationDot, faCar, faCalendarAlt, faThumbsUp, faComments, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NormalizeViPipe } from '../../../../pipe/normalize-vi.pipe';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { PaginationComponent } from '../../../general/pagination/pagination.component';
import { environment } from '../../../../../../environments/environment';
import { SnackbarService } from '../../../../services/component/snackbar.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-product-search',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        FontAwesomeModule,
        NormalizeViPipe,
        PaginationComponent,
        NgxPaginationModule
    ],
    templateUrl: './product-search.component.html',
    styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent implements OnInit {
    private _productService = inject(ProductService);
    private _router = inject(ActivatedRoute);
    private _clipboard = inject(Clipboard);
    private _snackbarService = inject(SnackbarService);

    products: Product[] = [] as Product[];

    faClock = faClock;
    faLocationDot = faLocationDot;
    faCar = faCar;
    faCalendarAlt = faCalendarAlt;
    faThumbsUp = faThumbsUp;
    faComments = faComments;
    faLink = faLink;

    page: number = 1;
    len: number = 9;
    totalItems: number = 0;

    query: string = "";
    imageUrl: string = environment.imgUrl;

    paginationConfig: PaginationInstance = {
        id: "product-list",
        itemsPerPage: this.len,
        currentPage: this.page,
        totalItems: this.totalItems
    }

    ngOnInit(): void {
        this._router.queryParams.subscribe((params) => {
            this.query = params["query"] || "";
            this.getListProduct(params["query"] || "");
        });
    }

    onChangePage(page: number) {
        this.page = page;
        this.paginationConfig.currentPage = page;
        this.getListProduct(this.query);
    }

    copyToClipboard(item: Product) {
        this._clipboard.copy(item.pdtCode);
        this._snackbarService.show("Copy thành công!", 3000);
    }

    private getListProduct(query: string) {
        this._productService
            .getPageProduct(this.getParamProduct(query))
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    this.products = res.body?.result || [];
                }
            });
    }

    private getParamProduct(query: string) {
        return {
            page: 1,
            limit: 10,
            query: query,
        };
    }
}
