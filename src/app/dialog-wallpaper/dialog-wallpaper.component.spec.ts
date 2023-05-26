import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWallpaperComponent } from './dialog-wallpaper.component';

describe('DialogWallpaperComponent', () => {
  let component: DialogWallpaperComponent;
  let fixture: ComponentFixture<DialogWallpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWallpaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
