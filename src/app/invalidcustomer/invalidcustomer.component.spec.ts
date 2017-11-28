import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidcustomerComponent } from './invalidcustomer.component';

describe('InvalidcustomerComponent', () => {
  let component: InvalidcustomerComponent;
  let fixture: ComponentFixture<InvalidcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
