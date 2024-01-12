import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewImageComponent } from './dialog-view-image.component';

describe('DialogViewImageComponent', () => {
  let component: DialogViewImageComponent;
  let fixture: ComponentFixture<DialogViewImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
