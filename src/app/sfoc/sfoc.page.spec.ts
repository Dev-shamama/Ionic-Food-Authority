import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SfocPage } from './sfoc.page';

describe('SfocPage', () => {
  let component: SfocPage;
  let fixture: ComponentFixture<SfocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SfocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
