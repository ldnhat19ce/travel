import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../model/product.model';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ValidationUtil } from '../../../../utils/validation.util';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { LanguageUtil } from '../../../../utils/language.util';
import { environment } from '../../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { NormalizeViPipe } from '../../../../pipe/normalize-vi.pipe';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../../../services/checkout.service';
import { Error } from '../../../../model/error.model';
import { format } from "date-fns";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faCartShopping, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faUsps } from '@fortawesome/free-brands-svg-icons';
import { Booking } from '../../../../model/booking.model';

@Component({
    selector: 'app-checkout-product',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        NormalizeViPipe,
        MatDatepickerModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule
    ],
    templateUrl: './checkout-product.component.html',
    styleUrl: './checkout-product.component.scss',
})
export class CheckoutProductComponent implements OnInit {
    private _productService = inject(ProductService);
    private _activatedRoute = inject(ActivatedRoute);
    private _router = inject(Router);
    private _localStorageService = inject(LocalStorageService);
    private _formBuilder = inject(FormBuilder);
    private _checkoutService = inject(CheckoutService);

    faReceipt = faReceipt;
    faUsps = faUsps;
    faArrowLeft = faArrowLeft;
    faCartShopping = faCartShopping;

    product: Product = {} as Product;

    loaded: boolean = false;
    submitted: boolean = false;

    imageUrl: string = environment.imgUrl;
    currentLang: string = 'vn';

    checkoutForm: FormGroup = this._formBuilder.group({
        name: ['', Validators.required],
        email: [''],
        phone: ['', Validators.required],
        address: [''],
        adult: [2],
        childrent1: [0],
        childrent2: [0],
        dateInit: ["", Validators.required],
        remark: [""],
        productCode: [""],
        registerDate: [format(new Date(), "yyyy/MM/dd")]
    });

    get f(): { [key: string]: AbstractControl } {
        return this.checkoutForm.controls;
    }

    ngOnInit(): void {
        this.currentLang = LanguageUtil.getLanguage(this._localStorageService);

        this._activatedRoute.params.subscribe((route) => {
            if (ValidationUtil.isNotNullAndNotUndefined(route['pdtCode'])) {
                this._productService
                .getDetailProduct(route['pdtCode'])
                .subscribe({
                    next: (res) => {
                        if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                            this.product = res.body || ({} as Product);
                            this.checkoutForm.patchValue({
                                productCode: this.product.pdtCode
                            });
                            this.loaded = true;
                        }
                    },
                    error: (err: HttpErrorResponse) => {
                        this._router.navigateByUrl('**');
                    },
                });
            }
        });
    }

    onChangeDate(event: MatDatepickerInputEvent<Date>) {
        if(event.value !== null && event.value !== undefined) {
            this.checkoutForm.patchValue({
                dateInit: event.value.getFullYear() + "-" +
                (String(event.value.getMonth()).length === 1 ? "0" : "")  + (Number(event.value.getMonth()) + 1) + "-" +
                (String(event.value.getDate()).length === 1 ? "0" : "")  + event.value.getDate()
            });
        }
    }

    onSubmit() {
        this.loaded = true;
        this.submitted = true;

        if (this.checkoutForm.invalid) {
            return;
        }

        this._checkoutService.saveCheckout(this.checkoutForm.value).subscribe({
            next: (value: HttpResponse<Booking>) => {
                if(ValidationUtil.isNotNullAndNotUndefined(value)) {
                    let booking: Booking = value.body || {} as Booking;
                    if(booking.bookingCode !== null && booking.bookingCode !== undefined) {
                        setTimeout(() => {
                            this.loaded = false;
                            this._router.navigateByUrl("/checkout/success/" + booking.bookingCode);
                        }, 2000);
                    }
                }
            },
            error: (err: Error) => {

            }
        });
    }

}
