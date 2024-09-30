import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionesPage } from './selecciones.page';

describe('SeleccionesPage', () => {
  let component: SeleccionesPage;
  let fixture: ComponentFixture<SeleccionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
