import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutProductComponent } from './checkout-product/checkout-product.component';

const routes: Routes = [
    { path: 'product/:pdtCode/:pdtName', component: CheckoutProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
