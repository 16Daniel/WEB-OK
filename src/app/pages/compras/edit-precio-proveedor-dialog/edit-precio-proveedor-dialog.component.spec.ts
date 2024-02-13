import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrecioProveedorDialogComponent } from './edit-precio-proveedor-dialog.component';

describe('EditPrecioProveedorDialogComponent', () => {
  let component: EditPrecioProveedorDialogComponent;
  let fixture: ComponentFixture<EditPrecioProveedorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPrecioProveedorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrecioProveedorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
