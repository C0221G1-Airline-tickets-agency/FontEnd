import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TicketCustomerDto} from '../../../../model/flight-ticket/TicketCustomerDto';
import {TicketService} from '../../../../service/flight-ticket/ticket.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {TokenStorageService} from "../../../../user/user-service/token-storage.service";


declare let paypal: any;

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css']
})
export class CustomerPaymentComponent implements OnInit {

  constructor(private matDialog: MatDialog, private ticketService: TicketService, private  toast: ToastrService,
              private tokenStorageService: TokenStorageService) {
  }

  listTicketCustomerBook: TicketCustomerDto[] = [];
  index = 0;
  listTicketPayment: TicketCustomerDto[] = [];
  listTicketIdPayment: string[] = new Array<string>();
  totalPayment = 0;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AU4EoqiuH-TsGt-hAThGLirSuuR015MTKSdSScW2t_Tvb7H31WWaXbVGub1x2pjEdC9IEk4Jt0qAbuuZ',
      production: ''
    },
    style: {
      label: 'pay',   // paypal | checkout | pay
      size: 'small',    // small | medium | large | responsive
      shape: 'pill',     // pill | rect
      color: 'gold',      // gold | blue | silver | black
      tagline: 'false'
    },
    commit: true,
    payment: (data, actions) => {
      // @ts-ignore
      return actions.payment.create(
        {
          payment: {
            transactions: [
              {amount: {total: (this.totalPayment / 23000).toFixed(2), currency: 'USD'}},
              // {amount: {total: 0.01, currency: 'USD'}},
            ]
          }
        });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        this.toast.success('Thanh toán thành công', 'Thông báo');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.listTicketIdPayment.length; i++) {
          this.ticketService.updateTicketPaid(this.listTicketIdPayment[i]).subscribe(() => {
            this.getListTicketCustomerBookFinish();
          }, error => {
          });
        }
        this.ticketService.sendMailInformation(this.tokenStorageService.getUser().username, this.listTicketPayment).subscribe(() => {
          this.getListTicketCustomerBookFinish();
        }, error => {
        });
        this.totalPayment = 0;
        this.listTicketPayment = [];
        this.listTicketIdPayment = [];
      });
    }, onError: err => {
      this.toast.warning('Chưa chọn vé thanh toán', 'Thông báo');

    }
  };


  ngOnInit(): void {
    this.getListTicketCustomerBook();
    this.getPaypPal();
  }

  //#region Paypal
  getPaypPal(): void {
    this.addPaypalScript().then(() => {
      paypal.Button.render(this.paypalConfig, '#myPaypalButton');
    });
  }

  private addPaypalScript() {
    return new Promise((resolve, rejects) => {
      const scriptTagElement = document.createElement('script');
      scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    });
  }

  dialogCancel(ticketId: number, ticketCode: string, ticketPriceSell: number, pointOfDeparture: string, destination: string) {
    Swal.fire({
      title: 'Bạn có chắc muốn hủy vé: ',
      // tslint:disable-next-line:max-line-length
      html: '<p style="color: #dc3545; text-align: left; margin-left: 130px">' + 'Mã vé:  ' + ticketCode + '</p>' + '<p style="color: #dc3545; text-align: left; margin-left: 130px" >' + 'Nơi đi:  ' + pointOfDeparture + '</p>' + '<p style="color: #dc3545; text-align: left; margin-left: 130px" >' + 'Nơi đến:  ' + destination + '</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '&emsp;Hủy&emsp;',
      cancelButtonText: '&emsp;Trở về&emsp;',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketService.updateTicketCancel(ticketId).subscribe(() => {
          this.toast.success('Hủy thành công', 'Thông báo');
          if (this.listTicketIdPayment.includes(ticketId.toString())) {
            this.totalPayment = this.totalPayment - ticketPriceSell;
          }
          this.getListTicketCustomerBookFinish();
          // window.location.reload();
        }, error => {
          this.toast.error('Hủy vé thất bại', 'Thông báo');
        });
      }
    });
  }

  getListTicketCustomerBook() {
    this.ticketService.getListTicketCustomerBook(this.tokenStorageService.getUser().id, this.index).subscribe(next => {
      if (next == null) {
        this.index = this.index - 5;
        this.toast.warning('Không có dữ liệu', 'Thông báo');
      } else {
        this.listTicketCustomerBook = next;
      }
    });
  }

  getListTicketCustomerBookFinish() {
    this.index = 0;
    this.ticketService.getListTicketCustomerBook(this.tokenStorageService.getUser().id, this.index).subscribe(next => {
      this.listTicketCustomerBook = next;
    });
  }

  nextPage() {
    this.index = this.index + 5;
    this.getListTicketCustomerBook();
  }

  previousPage() {
    this.index = this.index - 5;
    if (this.index < 0) {
      this.toast.warning('Không có dữ liệu', 'Thông báo');
      this.index = this.index + 5;
    } else {
      this.getListTicketCustomerBook();
    }
  }

  getListTicketId(e: any, ticketId: number, priceSale: number, ticket: TicketCustomerDto) {
    if (e.target.checked) {
      console.log(ticketId + 'checked');
      this.listTicketIdPayment.push(String(ticketId));
      this.listTicketPayment.push(ticket);
      this.totalPayment += priceSale;
    } else {
      console.log(ticketId + 'unchecked');
      // @ts-ignore
      this.listTicketIdPayment = this.listTicketIdPayment.filter(m => m !== ticketId);
      // @ts-ignore
      this.listTicketPayment = this.listTicketPayment.filter(m => m !== ticket);
      this.totalPayment -= priceSale;
    }
    console.log(this.listTicketIdPayment);
    console.log(this.totalPayment);
    console.log(this.listTicketPayment);
  }
}
