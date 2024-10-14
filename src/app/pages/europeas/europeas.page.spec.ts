import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EuropeasPage } from './europeas.page';

describe('EuropeasPage', () => {
  let component: EuropeasPage;
  let fixture: ComponentFixture<EuropeasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EuropeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
