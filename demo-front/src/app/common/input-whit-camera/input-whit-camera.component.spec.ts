import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWhitCameraComponent } from './input-whit-camera.component';

describe('InputWhitCameraComponent', () => {
  let component: InputWhitCameraComponent;
  let fixture: ComponentFixture<InputWhitCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputWhitCameraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputWhitCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
