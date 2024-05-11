import { Component } from '@angular/core';
import { BookingFireworkComponent } from './booking-firework/booking-firework.component';

@Component({
    selector: 'app-booking',
    standalone: true,
    imports: [BookingFireworkComponent],
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss',
})
export class BookingComponent {}
