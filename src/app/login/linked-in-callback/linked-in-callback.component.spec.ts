import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedInCallbackComponent } from './linked-in-callback.component';

describe('LinkedInCallbackComponent', () => {
  let component: LinkedInCallbackComponent;
  let fixture: ComponentFixture<LinkedInCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedInCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedInCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
