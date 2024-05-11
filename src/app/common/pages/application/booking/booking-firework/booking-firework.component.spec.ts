import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFireworkComponent } from './booking-firework.component';

describe('BookingFireworkComponent', () => {
  let component: BookingFireworkComponent;
  let fixture: ComponentFixture<BookingFireworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFireworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingFireworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
