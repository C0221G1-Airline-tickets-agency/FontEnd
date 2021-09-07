import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Report} from '../../model/report';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private startDate1: string;
  private endDate1: string;
  private startDate2: string;
  private endDate2: string;
  private typeChart: string;
  private typeReport: string;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(`${API_URL}/api/reports/get-all`);
  }

  getListStatisticalOneDate1(startDate: string, endDate: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${API_URL}/api/reports/get-statistical-one-date?startDate=` + startDate + '&endDate=' + endDate);
  }
  getListStatisticalOneDate2(startDate: string, endDate: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${API_URL}/api/reports/get-statistical-one-date?startDate=` + startDate + '&endDate=' + endDate);
  }
  getTop5Employee(startDate: string, endDate: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${API_URL}/api/reports/get-top-5-employee?startDate=` + startDate + '&endDate=' + endDate);
  }

  setParameter(startDate1: string, endDate1: string, startDate2: string, endDate2: string, typeChart: string, typeReport: string) {
    this.startDate1 = startDate1;
    this.endDate1 = endDate1;
    this.startDate2 = startDate2;
    this.endDate2 = endDate2;
    this.typeChart = typeChart;
    this.typeReport = typeReport;
  }

  getParameterStartDate1() {
    return this.startDate1;
  }

  getParameterEndDate1() {
    return this.endDate1;
  }

  getParameterStartDate2() {
    return this.startDate2;
  }

  getParameterEndDate2() {
    return this.endDate2;
  }

  getParameterTypeChart() {
    return this.typeChart;
  }

  getParameterTypeReport() {
    return this.typeReport;
  }
}
