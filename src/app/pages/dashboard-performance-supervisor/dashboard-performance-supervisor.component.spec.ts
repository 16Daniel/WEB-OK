import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPerformanceSupervisorComponent } from './dashboard-performance-supervisor.component';

describe('DashboardPerformanceSupervisorComponent', () => {
  let component: DashboardPerformanceSupervisorComponent;
  let fixture: ComponentFixture<DashboardPerformanceSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPerformanceSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPerformanceSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
