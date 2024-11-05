import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploaddocumentPage } from './uploaddocument.page';

describe('UploaddocumentPage', () => {
  let component: UploaddocumentPage;
  let fixture: ComponentFixture<UploaddocumentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaddocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
