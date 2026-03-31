import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioArtSemanalComponent } from './inventario-art-semanal.component';

describe('InventarioArtSemanalComponent', () => {
  let component: InventarioArtSemanalComponent;
  let fixture: ComponentFixture<InventarioArtSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioArtSemanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioArtSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
