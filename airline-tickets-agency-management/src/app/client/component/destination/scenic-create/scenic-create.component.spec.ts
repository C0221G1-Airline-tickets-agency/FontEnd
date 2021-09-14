import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenicCreateComponent } from './scenic-create.component';

describe('ScenicCreateComponent', () => {
  let component: ScenicCreateComponent;
  let fixture: ComponentFixture<ScenicCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenicCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
