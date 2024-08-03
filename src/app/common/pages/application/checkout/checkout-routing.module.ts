import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutProductComponent } from './checkout-product/checkout-product.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';

const routes: Routes = [
    { path: 'product/:pdtCode/:pdtName', component: CheckoutProductComponent },
    { path: 'success/:bookingCode', component: CheckoutSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
