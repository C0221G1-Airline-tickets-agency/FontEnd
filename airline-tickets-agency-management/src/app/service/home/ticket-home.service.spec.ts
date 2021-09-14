import { TestBed } from '@angular/core/testing';

import { TicketHomeService } from './ticket-home.service';

describe('TicketHomeService', () => {
  let service: TicketHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
