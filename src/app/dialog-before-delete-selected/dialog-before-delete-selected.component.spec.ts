import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBeforeDeleteSelectedComponent } from './dialog-before-delete-selected.component';

describe('DialogBeforeDeleteSelectedComponent', () => {
  let component: DialogBeforeDeleteSelectedComponent;
  let fixture: ComponentFixture<DialogBeforeDeleteSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBeforeDeleteSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBeforeDeleteSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
