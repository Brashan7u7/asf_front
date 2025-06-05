import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UspageComponent } from './uspage.component';

describe('UspageComponent', () => {
  let component: UspageComponent;
  let fixture: ComponentFixture<UspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UspageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
