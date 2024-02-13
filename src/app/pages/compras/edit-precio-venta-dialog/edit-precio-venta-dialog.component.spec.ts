import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrecioVentaDialogComponent } from './edit-precio-venta-dialog.component';

describe('EditPrecioVentaDialogComponent', () => {
  let component: EditPrecioVentaDialogComponent;
  let fixture: ComponentFixture<EditPrecioVentaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPrecioVentaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrecioVentaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
