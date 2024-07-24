import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';
import { TransformCategoryPipe } from '../../common/pipe/transform-category.pipe';
import { GetCateUrlPipe } from '../../common/pipe/get-cate-url.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { NormalizeViPipe } from '../../common/pipe/normalize-vi.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        TranslateModule,
        TransformCategoryPipe,
        GetCateUrlPipe,
        FontAwesomeModule,
        FormsModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule,
        NormalizeViPipe,
        RouterModule
    ],
    exports: [HeaderComponent]
})
export class HeaderModule {}
