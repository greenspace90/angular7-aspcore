import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodystylesComponent } from './bodystyles.component';

describe('BodystylesComponent', () => {
  let component: BodystylesComponent;
  let fixture: ComponentFixture<BodystylesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodystylesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodystylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
