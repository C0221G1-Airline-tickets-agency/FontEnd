import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {TicketService} from '../../../../../service/flight-ticket/ticket/ticket.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ticket} from '../../../../../model/flight-ticket/ticket';
import {ToastrService} from 'ngx-toastr';
import {TicketStatus} from '../../../../../model/flight-ticket/ticket-status';
import {TokenStorageService} from '../../../../../user/user-service/token-storage.service';

@Component({
  selector: 'app-passenger-information',
  templateUrl: './passenger-information.component.html',
  styleUrls: ['./passenger-information.component.css']
})
export class PassengerInformationComponent implements OnInit {
  id: number;
  listId: string[];
  ticketForm: FormGroup;
  formArray: FormArray = new FormArray([]);
  tickets: Ticket[];
  ticket: Ticket;

  constructor(private activatedRoute: ActivatedRoute,
              private ticketService: TicketService,
              private toast: ToastrService,
              private tokenStorageService: TokenStorageService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        // this.id = +paramMap.get('id');
      let id1 = paramMap.get('listId');
      this.listId = id1.split(',');
      console.log(this.listId);

        this.getTicket(id1);
    })
  }

  ngOnInit(): void {
  }


  getTicket(array: string){
    return this.ticketService.findManyTicketById(array).subscribe( (tickets: Ticket[]) => {
      console.log(tickets);
      for (const ticket of tickets) {
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
        this.formArray.push(this.ticketForm);
      }
      this.tickets = tickets;

    })
  }
  updateTicket(){
    let flag: boolean = true;
    for (let i=0;i<this.formArray.length;i++) {
      this.tickets[i].passengerName = this.formArray.value[i].passengerName;
      this.tickets[i].passengerGender = this.formArray.value[i].passengerGender;
      this.tickets[i].passengerPhone = this.formArray.value[i].passengerPhone;
      this.tickets[i].plusBaggage = this.formArray.value[i].plusBaggage;
      this.tickets[i].passengerEmail = this.formArray.value[i].passengerEmail;
      this.tickets[i].passengerIdCard = this.formArray.value[i].passengerIdCard;
      this.tickets[i].ticketStatus =  {ticketStatusId: 1};
      this.ticketService.update(this.tickets[i].ticketId, this.tickets[i]).subscribe(() => {
          // console.log(this.ticket);
          // this.toast.success('Mua vé thành công!', 'Chúc mừng:')
        flag = true;
        }, error => {
          // this.toast.error('Mua vé không thành công!', 'Thất bại:')
        flag = false;
        })
    }
    if(flag) {
      this.toast.success('Mua vé thành công!', 'Chúc mừng:')
    } else {
      this.toast.error('Mua vé không thành công!', 'Thất bại:')
    }

    // this.ticket.passengerName = this.ticketForm.value.passengerName;
    // this.ticket.passengerGender = this.ticketForm.value.passengerGender;
    // this.ticket.passengerPhone = this.ticketForm.value.passengerPhone;
    // this.ticket.plusBaggage = this.ticketForm.value.plusBaggage;
    // this.ticket.passengerEmail = this.ticketForm.value.passengerEmail;
    // this.ticket.passengerIdCard = this.ticketForm.value.passengerIdCard;
    // this.ticket.ticketStatus.ticketStatusId = 1;
    // console.log(this.ticket);
    // this.ticketService.update(this.id, this.ticket).subscribe(() => {
    //   // console.log(this.ticket);
    //   this.toast.success('Mua vé thành công!', 'Chúc mừng:')
    // }, error => {
    //   this.toast.error('Mua vé không thành công!', 'Thất bại:')
    // });
  }

}
