import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [NgxPaginationModule, CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
    @Input()
    config: PaginationInstance = {} as PaginationInstance;

    @Output()
    pageChange = new EventEmitter<number>();

    @Output()
    pageBoundsCorrection = new EventEmitter<number>();
}
