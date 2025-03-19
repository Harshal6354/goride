import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsoComponent } from './carso.component';

describe('CarsoComponent', () => {
  let component: CarsoComponent;
  let fixture: ComponentFixture<CarsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
