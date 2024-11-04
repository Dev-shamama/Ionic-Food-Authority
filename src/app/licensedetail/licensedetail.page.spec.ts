import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicensedetailPage } from './licensedetail.page';

describe('LicensedetailPage', () => {
  let component: LicensedetailPage;
  let fixture: ComponentFixture<LicensedetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
