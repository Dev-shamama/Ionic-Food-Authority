import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendotpPage } from './sendotp.page';

describe('SendotpPage', () => {
  let component: SendotpPage;
  let fixture: ComponentFixture<SendotpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SendotpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
