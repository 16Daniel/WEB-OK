import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVentaVendedorComponent } from './reporte-venta-vendedor.component';

describe('ReporteVentaVendedorComponent', () => {
  let component: ReporteVentaVendedorComponent;
  let fixture: ComponentFixture<ReporteVentaVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteVentaVendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteVentaVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
