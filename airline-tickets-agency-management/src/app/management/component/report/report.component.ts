import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../service/report/report.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  startDate1 = '';
  endDate1 = '';
  startDate2 = '';
  endDate2 = '';
  typeChart: string;
  typeReport: string;
  hide = false;
  isDateNow = false;
  isTimeNow = false;
  public reportFrom: FormGroup;
  // tslint:disable-next-line:variable-name
  validate_message = {
    date: [
      {type: 'pattern', message: '* Vui lòng nhập ngày theo định dạng ex:dd-mm-yyyy'},
    ],
    startDate: [
      {type: 'required', message: '* Vui lòng nhập ngày bắt đầu hoặc chọn thời gian'},
    ],
    endDate: [
      {type: 'required', message: '* Vui lòng nhập ngày ngày kết thúc hoặc chọn thời gian'},
    ],
    chooseDate: [
      {type: 'required', message: '* Vui lòng thời gian hoặc nhập ngày'},
    ],
    typeChart: [
      {type: 'required', message: '* Vui lòng chọn hình báo cáo'}
    ],
    typeReport: [
      {type: 'required', message: '* Vui lòng chọn kiểu báo cáo'}
    ],
  };

  constructor(private reportService: ReportService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.reportFrom = new FormGroup({
      startDate1: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}\\-\\d{2}\\-\\d{2}$')]),
      endDate1: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}\\-\\d{2}\\-\\d{2}$')]),
      startDate2: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}\\-\\d{2}\\-\\d{2}$')]),
      endDate2: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}\\-\\d{2}\\-\\d{2}$')]),
      typeChart: new FormControl('', [Validators.required]),
      typeReport: new FormControl('', [Validators.required]),
      chooseTime1: new FormControl(''),
      chooseTime2: new FormControl('')
    }, this.validDate);
    // this.getDateOfMonth(new Date().getFullYear() + '-' + (new Date().getMonth() + 1));
  }

  search() {
    this.reportService.setParameter(this.reportFrom.value.startDate1, this.reportFrom.value.endDate1, this.reportFrom.value.startDate2,
      this.reportFrom.value.endDate2, this.reportFrom.value.typeChart, this.reportFrom.value.typeReport);
    this.addNewImportBill();
  }

  addNewImportBill() {
    this.router.navigate(['management/statistical']);
  }

  test(hide: any) {
    this.hide = false;
    switch (hide.value) {
      case 'revenue':
        this.hide = false;
        return;
      case 'employee':
        this.hide = true;
        return;
      case 'airline':
        this.hide = true;
        return;
    }
  }

  validDate(control: AbstractControl) {
    const v = control.value;
    const start1 = new Date(v.startDate1);
    const end1 = new Date(v.endDate1);
    const start2 = new Date(v.startDate2);
    const end2 = new Date(v.endDate2);
    if (end1.getTime() - start1.getTime() < 0) {
      return {validDate1: true};
    }
    if (Date.now() - start1.getTime() < 0) {
      return {validDateStartNow1: true};
    }
    if (Date.now() - end1.getTime() < 0) {
      return {validDateEndNow1: true};
    }
    if (end2.getTime() - start2.getTime() < 0) {
      return {validDate2: true};
    }
    if (Date.now() - start2.getTime() < 0) {
      return {validDateStartNow2: true};
    }
    if (Date.now() - end2.getTime() < 0) {
      return {validDateEndNow2: true};
    }
    return null;
  }

  getDateOfMonthNow(m) {
    const time = new Date(m);
    const startDate = this.formatDateToDb(time);
    const endDate = this.formatDateToDb(new Date(time.getFullYear(), time.getMonth() + 1, time.getDate()));
    this.reportFrom.value.startDate1 = startDate;
    this.reportFrom.value.endDate1 = endDate;
  }

  getDateOfMonthLast(m) {
    const time = new Date(m);
    const startDate = this.formatDateToDb(time);
    const endDate = this.formatDateToDb(new Date(time.getFullYear(), time.getMonth() + 1, time.getDate()));
    this.reportFrom.value.startDate2 = startDate;
    this.reportFrom.value.endDate2 = endDate;
  }

  //
  // getDateOfWeek(w, y) {
  //   if (w === undefined || y === undefined) {
  //     return '';
  //   }
  //   this.startDate = this.formatDateToDb(new Date(y, 0, (1 + (w - 1) * 7) - 4));
  //   this.endDate = this.formatDateToDb(new Date(y, 0, (3 + (w - 1) * 7)));
  //   const startDate = this.formatDateShowClient(new Date(y, 0, (1 + (w - 1) * 7) - 4));
  //   const endDate = this.formatDateShowClient(new Date(y, 0, (3 + (w - 1) * 7)));
  //   return 'Từ ' + startDate + ' đến ' + endDate + '.';
  // }
  //
  // getDateOfYear(y) {
  //   this.startDate = this.formatDateToDb(new Date(y, 0, 1));
  //   this.endDate = this.formatDateToDb(new Date(+y + 1, 0, 1));
  //   const startDate = this.formatDateShowClient(new Date(y, 0, 1));
  //   const endDate = this.formatDateShowClient(new Date(+y + 1, 0, 1));
  //   return 'Từ ' + startDate + ' đến ' + endDate + '.';
  // }
  formatDateToDb(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  getLastTime(target: EventTarget) {
  }

  getTimeNow(target: EventTarget) {
  }

  // chooseDateNow(choose) {
  //   if (choose === 'date') {
  //     this.isDateNow = true;
  //
  //   } else {
  //     this.isTimeNow = true;
  //     this.isDateNow = false;
  //   }
  // }
}
