import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationprocessPage } from './verificationprocess.page';

describe('VerificationprocessPage', () => {
  let component: VerificationprocessPage;
  let fixture: ComponentFixture<VerificationprocessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationprocessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
