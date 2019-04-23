import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMagnifierComponent } from './ngx-magnifier.component';

describe('NgxMagnifierComponent', () => {
  let component: NgxMagnifierComponent;
  let fixture: ComponentFixture<NgxMagnifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMagnifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMagnifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
