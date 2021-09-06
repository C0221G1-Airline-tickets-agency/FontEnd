import {Component, ViewChild, OnInit} from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from 'ng-apexcharts';
import {Report} from '../../../model/report';
import {ReportService} from '../../../service/report/report.service';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
}

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  // @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  statisticalCharts: Report[] = [];

  constructor(private sv: ReportService) {
  }

  ngOnInit(): void {
    this.showChart();
  }

  showChart() {
    this.sv.getAll().subscribe(o => {
      console.log(o);
      this.statisticalCharts = o;
      let i;
      for (i = 0; i < this.statisticalCharts.length; i++) {
        // @ts-ignore
        this.chartOptions.series[0].data.push({x: this.statisticalCharts[i].flightDate, y: this.statisticalCharts[i].totalMoney});
        this.chartOptions.xaxis.categories = this.statisticalCharts[i].flightDate;
        console.log(this.statisticalCharts[i].flightDate);
        console.log(this.statisticalCharts[i].totalMoney);
        this.chartOptions.chart.type = 'bar';
      }
    });
    this.paintChartByDate();
  }

  paintChartByDate() {
    this.chartOptions = {
      series: [
        {
          name: 'series1',
          data: []
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: []
      },
      tooltip: {
        x: {
          format: 'dd/MM/yyyy'
        }
      },
    };
  }
}
