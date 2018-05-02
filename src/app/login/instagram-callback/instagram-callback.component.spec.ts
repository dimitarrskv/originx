import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramCallbackComponent } from './instagram-callback.component';

describe('InstagramCallbackComponent', () => {
  let component: InstagramCallbackComponent;
  let fixture: ComponentFixture<InstagramCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstagramCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstagramCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
