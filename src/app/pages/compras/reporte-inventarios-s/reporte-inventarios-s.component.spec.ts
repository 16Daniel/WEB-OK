import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteInventariosSComponent } from './reporte-inventarios-s.component';

describe('ReporteInventariosSComponent', () => {
  let component: ReporteInventariosSComponent;
  let fixture: ComponentFixture<ReporteInventariosSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteInventariosSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteInventariosSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
