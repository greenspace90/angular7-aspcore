import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciationchartComponent } from './depreciationchart.component';

describe('DepreciationchartComponent', () => {
  let component: DepreciationchartComponent;
  let fixture: ComponentFixture<DepreciationchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepreciationchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepreciationchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
