import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ValidationUtil } from '../../../../utils/validation.util';

@Component({
    selector: 'app-checkout-success',
    standalone: true,
    imports: [
        RouterModule
    ],
    templateUrl: './checkout-success.component.html',
    styleUrl: './checkout-success.component.scss',
})
export class CheckoutSuccessComponent implements OnInit {
    private _activatedRoute = inject(ActivatedRoute);

    orderNo: string = "";

    ngOnInit(): void {
        this._activatedRoute.params.subscribe(params => {
            if (ValidationUtil.isNotNullAndNotUndefined(params['bookingCode'])) {
                this.orderNo = params['bookingCode'];
            }
        });
    }
}
