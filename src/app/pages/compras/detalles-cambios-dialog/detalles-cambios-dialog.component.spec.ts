import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCambiosDialogComponent } from './detalles-cambios-dialog.component';

describe('DetallesCambiosDialogComponent', () => {
  let component: DetallesCambiosDialogComponent;
  let fixture: ComponentFixture<DetallesCambiosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesCambiosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCambiosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
