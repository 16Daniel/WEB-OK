import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCambiosComponent } from './solicitud-cambios.component';

describe('SolicitudCambiosComponent', () => {
  let component: SolicitudCambiosComponent;
  let fixture: ComponentFixture<SolicitudCambiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudCambiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudCambiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
