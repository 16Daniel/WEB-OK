import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleAceiteComponent } from './dialog-detalle-aceite.component';

describe('DialogDetalleAceiteComponent', () => {
  let component: DialogDetalleAceiteComponent;
  let fixture: ComponentFixture<DialogDetalleAceiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetalleAceiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetalleAceiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
