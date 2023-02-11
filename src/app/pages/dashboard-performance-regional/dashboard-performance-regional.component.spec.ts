import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPerformanceRegionalComponent } from './dashboard-performance-regional.component';

describe('DashboardPerformanceRegionalComponent', () => {
  let component: DashboardPerformanceRegionalComponent;
  let fixture: ComponentFixture<DashboardPerformanceRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPerformanceRegionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPerformanceRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
