import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteChecadasComponent } from './reporte-checadas.component';

describe('ReporteChecadasComponent', () => {
  let component: ReporteChecadasComponent;
  let fixture: ComponentFixture<ReporteChecadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteChecadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteChecadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
