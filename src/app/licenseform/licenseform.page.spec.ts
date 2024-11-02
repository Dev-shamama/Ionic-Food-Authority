import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicenseformPage } from './licenseform.page';

describe('LicenseformPage', () => {
  let component: LicenseformPage;
  let fixture: ComponentFixture<LicenseformPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
