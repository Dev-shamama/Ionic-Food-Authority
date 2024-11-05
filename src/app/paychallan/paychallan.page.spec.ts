import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaychallanPage } from './paychallan.page';

describe('PaychallanPage', () => {
  let component: PaychallanPage;
  let fixture: ComponentFixture<PaychallanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaychallanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
