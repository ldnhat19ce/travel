import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRoutingModule } from './footer-routing.module';
import { FooterComponent } from './footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [FooterComponent],
    imports: [
        CommonModule,
        FooterRoutingModule,
        FontAwesomeModule
    ],
    exports: [FooterComponent]
})
export class FooterModule {}
