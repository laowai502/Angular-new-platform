import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LChildComponent } from './l-child.component';

describe('LChildComponent', () => {
  let component: LChildComponent;
  let fixture: ComponentFixture<LChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
