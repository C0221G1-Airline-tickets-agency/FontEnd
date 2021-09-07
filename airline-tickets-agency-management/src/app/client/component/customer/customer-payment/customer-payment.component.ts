import { Component, OnInit } from '@angular/core';
import {DialogService} from '../../../../service/dialog.service';
import {MatDialog} from '@angular/material/dialog';
import {CustomerDialogCancelTicketComponent} from '../customer-dialog-cancel-ticket/customer-dialog-cancel-ticket.component';
import {TicketCustomerDto} from '../../../../model/flight-ticket/TicketCustomerDto';
import {TicketService} from '../../../../service/flight-ticket/ticket.service';

declare let paypal: any;

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css']
})
export class CustomerPaymentComponent implements OnInit {

  constructor(private matDialog: MatDialog, private ticketService: TicketService) { }
  listTicketCustomerBook: TicketCustomerDto[] = [];
  index = 0;

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
      return actions.payment.create({
        payment: {
          transactions: [
            // {amount: {total: this.moneyPayPal, currency: 'USD'}}
            {amount: {total: 0.01, currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        alert('thanh toán thành công');
        // // Do something when payment is successful.
        // this.voucherMoney = 0;
        // this.resultMsg = 'Thanh toán thành công';
        //
        // localStorage.removeItem(CART_KEY);
        // this.showMessageSuccess();
        // // Xóa Voucher
        // this.cartService.removeVoucher(this.voucherListIdUsed.toString()).subscribe(success => {
        //   console.log("ok");
        // }, error => {
        //   console.log("error");
        // });
        // // Send email.
        // let list = [];
        // console.log(this.drugCartListShow);
        // this.drugCartListShow.forEach(e => {
        //   list.push(e.drugId, e.count)
        // });
        // console.log(list.toString());
        // this.cartService.sendEmail(this.user.accountName, this.user.email, list.toString()).subscribe(e => {
        //   console.log('ok');
        // }, error => {
        //   console.log('error');
        // });
        // this.drugCartListShow = [];
      });
    }
  };


  ngOnInit(): void {
    this.getPaypPal();
    this.getListTicketCustomerBook();
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

  dialogCancel() {
    const dialog = this.matDialog.open(CustomerDialogCancelTicketComponent, {
    });
  }

  getListTicketCustomerBook() {
    this.ticketService.getListTicketCustomerBook(1, this.index).subscribe(next => {
      if (next == null) {
        this.index = this.index - 5;
        alert('lỗi');
      } else {
        this.listTicketCustomerBook = next;
      }
    });
  }

  nextPage() {
    this.index = this.index + 5;
    this.getListTicketCustomerBook();
  }

  previousPage() {
    this.index = this.index - 5;
    if (this.index < 0) {
      alert('lỗi');
      this.index = this.index + 5;
    } else {
      this.getListTicketCustomerBook();
    }
  }
}
