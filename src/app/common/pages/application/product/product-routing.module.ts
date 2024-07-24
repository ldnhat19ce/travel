import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSearchComponent } from './product-search/product-search.component';

const routes: Routes = [
    { path: 'list/:id/:content', component: ProductListComponent },
    { path: ':productCode/:content', component: ProductDetailComponent },
    { path: 'search', component: ProductSearchComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
