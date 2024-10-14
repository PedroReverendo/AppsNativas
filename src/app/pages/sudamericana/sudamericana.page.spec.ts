import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SudamericanaPage } from './sudamericana.page';

describe('SudamericanaPage', () => {
  let component: SudamericanaPage;
  let fixture: ComponentFixture<SudamericanaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SudamericanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
