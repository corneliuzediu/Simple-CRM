import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBeforeDeleteComponent } from './dialog-before-delete.component';

describe('DialogBeforeDeleteComponent', () => {
  let component: DialogBeforeDeleteComponent;
  let fixture: ComponentFixture<DialogBeforeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBeforeDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBeforeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
