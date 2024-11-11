import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LicenseviewPage } from './licenseview.page';

describe('LicenseviewPage', () => {
  let component: LicenseviewPage;
  let fixture: ComponentFixture<LicenseviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
