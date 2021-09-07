import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../service/report/report.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  startDate1 = '';
  endDate1: string;
  startDate2: string;
  endDate2: string;
  typeChart: string;
  typeReport: string;
  public reportFrom: FormGroup;

  constructor(private reportService: ReportService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.reportFrom = new FormGroup({
      startDate1: new FormControl(''),
      endDate1: new FormControl(''),
      startDate2: new FormControl(''),
      endDate2: new FormControl(''),
      typeChart: new FormControl(''),
      typeReport: new FormControl(''),
    });
  }

  search() {
    this.reportService.setParameter(this.reportFrom.value.startDate1, this.reportFrom.value.endDate1, this.reportFrom.value.startDate2,
      this.reportFrom.value.endDate2, this.reportFrom.value.typeChart, this.reportFrom.value.typeReport);
    this.addNewImportBill();
  }

  addNewImportBill() {
    this.router.navigate(['management/statistical']);
  }
}
