import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationDeleteComponent } from './destination-delete.component';

describe('DestinationDeleteComponent', () => {
  let component: DestinationDeleteComponent;
  let fixture: ComponentFixture<DestinationDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
