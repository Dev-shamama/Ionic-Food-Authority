import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallanlistPage } from './challanlist.page';

describe('ChallanlistPage', () => {
  let component: ChallanlistPage;
  let fixture: ComponentFixture<ChallanlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
