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
      this.ticketForm = new FormGroup({
        passengerName: new FormControl('', [Validators.required, Validators.pattern('[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ ]*')]),
        passengerGender: new FormControl('', Validators.required),
        passengerPhone: new FormControl('', Validators.pattern(/^\+84\d{9,11}$/)),
        plusBaggage: new FormControl('', Validators.pattern(/^\d*$/)),
        passengerEmail: new FormControl('', Validators.email),
        passengerIdCard: new FormControl('', [Validators.required, Validators.pattern(/^\d{9,10}$/)]),
      });
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
    this.ticketService.update(this.id, this.ticket).subscribe(() => {
      // console.log(this.ticket);
      this.toast.success('Mua vé thành công!', 'Chúc mừng:')
    }, error => {
      this.toast.error('Mua vé không thành công', 'Thất bại:')
    });
  }

}
