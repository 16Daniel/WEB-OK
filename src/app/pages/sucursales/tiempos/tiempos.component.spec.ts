import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiemposComponent } from './tiempos.component';

describe('TiemposComponent', () => {
  let component: TiemposComponent;
  let fixture: ComponentFixture<TiemposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiemposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiemposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
