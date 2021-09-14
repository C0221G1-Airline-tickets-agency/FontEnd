import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../../../service/flight-ticket/ticket.service';
import {TicketCustomerDto} from '../../../../model/flight-ticket/TicketCustomerDto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-transaction-history',
  templateUrl: './customer-transaction-history.component.html',
  styleUrls: ['./customer-transaction-history.component.css']
})
export class CustomerTransactionHistoryComponent implements OnInit {
  listTicketTransaction: TicketCustomerDto[] = [];
  index = 0;

  constructor(private ticketService: TicketService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getListTicketCustomerTransaction();
  }

  getListTicketCustomerTransaction() {
    this.ticketService.getListTicketCustomerTransaction(1, this.index).subscribe(next => {
      if (next == null) {
        this.index = this.index - 5;
        this.toast.warning('Không có dữ liệu', 'Thông báo');
      } else {
        this.listTicketTransaction = next;
      }
    });
  }

  nextPage() {
    this.index = this.index + 5;
    this.getListTicketCustomerTransaction();
  }

  previousPage() {
    this.index = this.index - 5;
    if (this.index < 0) {
      this.toast.warning('Không có dữ liệu', 'Thông báo');
      this.index = this.index + 5;
    } else {
      this.getListTicketCustomerTransaction();
    }
  }
}
