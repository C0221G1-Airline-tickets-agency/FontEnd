import { Component, OnInit } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css']
})
export class CustomerPaymentComponent implements OnInit {

  constructor() { }

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AbnnpqkZWFt3p_vsAq9MTYGktX4-6iq1LQVNQlSCVSFPxZ-wNFmL65aE0JGqu4E8a1nzUDX8XkP2amk6',
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
            {amount: {total: 1, currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
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
}
