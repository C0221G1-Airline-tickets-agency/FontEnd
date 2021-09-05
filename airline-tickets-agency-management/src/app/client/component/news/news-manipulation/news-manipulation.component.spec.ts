import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsManipulationComponent } from './news-manipulation.component';

describe('NewsManipulationComponent', () => {
  let component: NewsManipulationComponent;
  let fixture: ComponentFixture<NewsManipulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsManipulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
