import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteRankingComponent } from './reporte-ranking.component';

describe('ReporteRankingComponent', () => {
  let component: ReporteRankingComponent;
  let fixture: ComponentFixture<ReporteRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
