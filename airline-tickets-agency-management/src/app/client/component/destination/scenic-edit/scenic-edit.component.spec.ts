import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenicEditComponent } from './scenic-edit.component';

describe('ScenicEditComponent', () => {
  let component: ScenicEditComponent;
  let fixture: ComponentFixture<ScenicEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenicEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
