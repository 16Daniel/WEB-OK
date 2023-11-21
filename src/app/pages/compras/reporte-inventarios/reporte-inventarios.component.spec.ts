import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteInventariosComponent } from './reporte-inventarios.component';

describe('ReporteInventariosComponent', () => {
  let component: ReporteInventariosComponent;
  let fixture: ComponentFixture<ReporteInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteInventariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
