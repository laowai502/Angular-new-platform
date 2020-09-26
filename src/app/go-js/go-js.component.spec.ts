import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoJsComponent } from './go-js.component';

describe('GoJsComponent', () => {
  let component: GoJsComponent;
  let fixture: ComponentFixture<GoJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
