import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAppsComponent } from './reporte-apps.component';

describe('ReporteAppsComponent', () => {
  let component: ReporteAppsComponent;
  let fixture: ComponentFixture<ReporteAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAppsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
