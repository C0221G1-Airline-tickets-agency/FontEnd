import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationUpdateComponent } from './destination-update.component';

describe('DestinationUpdateComponent', () => {
  let component: DestinationUpdateComponent;
  let fixture: ComponentFixture<DestinationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
