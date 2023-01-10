import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleAperturaComponent } from './dialog-detalle-apertura.component';

describe('DialogDetalleAperturaComponent', () => {
  let component: DialogDetalleAperturaComponent;
  let fixture: ComponentFixture<DialogDetalleAperturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetalleAperturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetalleAperturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
