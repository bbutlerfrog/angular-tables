import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandEmployeeTableComponent } from './expand-employee-table.component';

describe('ExpandEmployeeTableComponent', () => {
  let component: ExpandEmployeeTableComponent;
  let fixture: ComponentFixture<ExpandEmployeeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandEmployeeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandEmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
