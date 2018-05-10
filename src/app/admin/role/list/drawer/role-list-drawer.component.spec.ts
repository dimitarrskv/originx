import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListDrawerComponent } from './role-list-drawer.component';

describe('RoleListDrawerComponent', () => {
  let component: RoleListDrawerComponent;
  let fixture: ComponentFixture<RoleListDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleListDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
