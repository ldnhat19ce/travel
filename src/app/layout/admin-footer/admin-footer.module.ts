import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminFooterRoutingModule } from './admin-footer-routing.module';
import { AdminFooterComponent } from './admin-footer.component';

@NgModule({
    declarations: [AdminFooterComponent],
    imports: [CommonModule, AdminFooterRoutingModule],
    exports: [AdminFooterComponent]
})
export class AdminFooterModule {}
