import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-booking-firework',
    standalone: true,
    imports: [
        RouterLink,
        TranslateModule
    ],
    templateUrl: './booking-firework.component.html',
    styleUrl: './booking-firework.component.scss',
})
export class BookingFireworkComponent {}
