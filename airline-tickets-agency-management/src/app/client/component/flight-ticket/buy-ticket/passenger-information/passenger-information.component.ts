import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {TicketService} from '../../../../../service/flight-ticket/ticket/ticket.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Ticket} from '../../../../../model/flight-ticket/ticket';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-passenger-information',
  templateUrl: './passenger-information.component.html',
  styleUrls: ['./passenger-information.component.css']
})
export class PassengerInformationComponent implements OnInit {
  id: number;
  ticketForm: FormGroup;
  ticket: Ticket;

  constructor(private activatedRoute: ActivatedRoute,
              private ticketService: TicketService,
              private toast: ToastrService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this.id = +paramMap.get('id');
        this.getTicket(this.id);
    })
  }

  ngOnInit(): void {
  }

  getTicket(id: number){
    return this.ticketService.findTicketById(id).subscribe( (ticket: Ticket) => {
      if (ticket.passengerType=='Người lớn'){
        this.ticketForm = new FormGroup({
          passengerName: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern('[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ ]*')]),
          passengerGender: new FormControl('', Validators.required),
          passengerPhone: new FormControl('', Validators.pattern(/^\(\+84\)+90+\d{7}$|^\(\+84\)+91+\d{7}$/)),
          plusBaggage: new FormControl('', Validators.pattern(/^\d*$/)),
          passengerEmail: new FormControl('', [Validators.email, Validators.pattern(/[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}/)]),
          passengerIdCard: new FormControl('', [Validators.required, Validators.pattern(/^\d{9,10}$/)]),
        });
      } else {
        this.ticketForm = new FormGroup({
          passengerName: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50), Validators.pattern('[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ ]*')]),
          passengerGender: new FormControl('', Validators.required),
          passengerPhone: new FormControl('', [Validators.pattern(/^\(\+84\)+90+\d{7}$|^\(\+84\)+91+\d{7}$/)]),
          plusBaggage: new FormControl('', Validators.pattern(/^\d*$/)),
          passengerEmail: new FormControl('', [Validators.email, Validators.pattern(/[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,3}/)]),
          passengerIdCard: new FormControl('000000001'),
        });
      }
      this.ticket = ticket;
    })
  }
  updateTicket(){
    this.ticket.passengerName = this.ticketForm.value.passengerName;
    this.ticket.passengerGender = this.ticketForm.value.passengerGender;
    this.ticket.passengerPhone = this.ticketForm.value.passengerPhone;
    this.ticket.plusBaggage = this.ticketForm.value.plusBaggage;
    this.ticket.passengerEmail = this.ticketForm.value.passengerEmail;
    this.ticket.passengerIdCard = this.ticketForm.value.passengerIdCard;
    this.ticket.ticketStatus.ticketStatusId = 1;
    // console.log(this.ticket);
    this.ticketService.update(this.id, this.ticket).subscribe(() => {
      // console.log(this.ticket);
      this.toast.success('Mua vé thành công!', 'Chúc mừng:')
    }, error => {
      this.toast.error('Mua vé không thành công!', 'Thất bại:')
    });
  }

}
