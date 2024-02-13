import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCambiosItemsComponent } from './historial-cambios-items.component';

describe('HistorialCambiosItemsComponent', () => {
  let component: HistorialCambiosItemsComponent;
  let fixture: ComponentFixture<HistorialCambiosItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialCambiosItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCambiosItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
