import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDialogCancelTicketComponent } from './customer-dialog-cancel-ticket.component';

describe('CustomerDialogCancelTicketComponent', () => {
  let component: CustomerDialogCancelTicketComponent;
  let fixture: ComponentFixture<CustomerDialogCancelTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDialogCancelTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDialogCancelTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
