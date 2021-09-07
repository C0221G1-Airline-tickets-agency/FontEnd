import {Component, ViewChild, OnInit} from '@angular/core';
import {
  // top
  ApexStates,
  // Bar
  ApexPlotOptions,
  ApexFill,
  // circle
  ApexNonAxisChartSeries,
  ApexResponsive,
  // lie
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexXAxis
} from 'ng-apexcharts';
import {Report} from '../../../model/report';
import {ReportService} from '../../../service/report/report.service';

// export interface ChartOptions {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   stroke: ApexStroke;
//   tooltip: ApexTooltip;
//   dataLabels: ApexDataLabels;
// }
export interface ChartOptions {
  // bar
  seriesBar: ApexAxisChartSeries;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  // circle
  seriesPie: ApexNonAxisChartSeries;
  responsive: ApexResponsive[];
  labels: any;
  // lie
  seriesLine: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
}

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  statisticalChart1: Report[] = [];
  statisticalChart2: Report[] = [];
  startDate1: string;
  endDate1: string;
  startDate2: string;
  endDate2: string;
  typeChart: string;
  typeReport: string;
  totalPie1 = 0;
  totalPie2 = 0;
  isLine = false;
  isCircle = false;
  isBar = false;
  categories = [
    'day 1',
    'Ngày 2',
    'ngày 3',
    'Ngày 4',
    'Ngày 5',
    'ngày 6',
    'Ngày 7'
  ];

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.showChart();
  }

  showChart() {
    this.typeChart = this.reportService.getParameterTypeChart();
    this.typeReport = this.reportService.getParameterTypeReport();
    if (this.typeReport === 'revenue') {
      switch (this.typeChart) {
        case 'circle':
          this.isCircle = true;
          this.setChartPie1();
          this.setChartPie2();
          this.paintChartTypeCircle();
          return;
        case 'line':
          this.isLine = true;
          this.paintChartTypeLine();
          this.setChartLine1();
          this.setChartLine2();
          this.setCategory();
          return;
        case 'bar':
          this.isBar = true;
          this.setChartBar1();
          this.setChartBar2();
          this.paintChartTypeBar();
          return;
        default:
          return;
      }
      return;
    }
  }

// line
  setChartLine1() {
    this.startDate1 = this.reportService.getParameterStartDate1();
    this.endDate1 = this.reportService.getParameterEndDate1();
    this.reportService.getListStatisticalOneDate1(this.startDate1, this.endDate1).subscribe(chart1 => {
      this.statisticalChart1 = chart1;
      let i;
      for (i = 0; i < this.statisticalChart1.length; i++) {
        // @ts-ignore
        this.chartOptions.seriesLine[0].data.push(this.statisticalChart1[i].totalMoney);
      }
    });

  }

  setChartLine2() {
    this.startDate2 = this.reportService.getParameterStartDate2();
    this.endDate2 = this.reportService.getParameterEndDate2();
    this.reportService.getListStatisticalOneDate2(this.startDate2, this.endDate2).subscribe(chart2 => {
      this.statisticalChart2 = chart2;
      let i;
      for (i = 0; i < this.statisticalChart2.length; i++) {
        // @ts-ignore
        this.chartOptions.seriesLine[1].data.push(this.statisticalChart2[i].totalMoney);
      }
    });
  }

  setCategory() {
    console.log('Hello');
    let i;
    for (i = 0; i < this.categories.length; i++) {
      this.chartOptions.xaxis.categories.push(this.categories[i]);
    }
  }

  paintChartTypeLine() {
    this.chartOptions = {
      seriesLine: [
        {
          name: 'tuần 1',
          data: []
        },
        {
          name: 'tuần 2',
          data: []
        },
      ],
      chart: {
        height: 350,
        type: 'line'
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        width: 5,
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Doanh Thu',
        align: 'center'
      },
      legend: {
        tooltipHoverFormatter(val, opts) {
          return (
            val +
            ' - <strong>' +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            '</strong>'
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: []
      },
      tooltip: {
        y: [
          {
            title: {
              formatter(val) {
                return val + ' (mins)';
              }
            }
          },
          {
            title: {
              formatter(val) {
                return val + ' per session';
              }
            }
          },
          {
            title: {
              formatter(val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#f1f1f1'
      }
    };
  }

// pie
  setChartPie1() {
    this.startDate1 = this.reportService.getParameterStartDate1();
    this.endDate1 = this.reportService.getParameterEndDate1();
    this.reportService.getListStatisticalOneDate1(this.startDate1, this.endDate1).subscribe(chart1 => {
      this.statisticalChart1 = chart1;
      let i;
      for (i = 0; i < this.statisticalChart1.length; i++) {
        // tslint:disable-next-line:radix
        this.totalPie1 += Number(this.statisticalChart1[i].totalMoney);
      }
      this.chartOptions.seriesPie.push(this.totalPie1);
    });
  }

  setChartPie2() {
    this.startDate2 = this.reportService.getParameterStartDate2();
    this.endDate2 = this.reportService.getParameterEndDate2();
    this.reportService.getListStatisticalOneDate2(this.startDate2, this.endDate2).subscribe(chart2 => {
      this.statisticalChart2 = chart2;
      let i;
      for (i = 0; i < this.statisticalChart2.length; i++) {
        // tslint:disable-next-line:radix
        this.totalPie2 += Number(this.statisticalChart2[i].totalMoney);
      }
      this.chartOptions.seriesPie.push(this.totalPie2);
    });
  }

  paintChartTypeCircle() {
    this.chartOptions = {
      seriesPie: [],
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  // bar
  setChartBar1() {
    this.startDate1 = this.reportService.getParameterStartDate1();
    this.endDate1 = this.reportService.getParameterEndDate1();
    this.reportService.getListStatisticalOneDate1(this.startDate1, this.endDate1).subscribe(chart1 => {
      this.statisticalChart1 = chart1;
      let i;
      for (i = 0; i < this.statisticalChart1.length; i++) {
        // @ts-ignore
        this.chartOptions.seriesBar[0].data.push(this.statisticalChart1[i].totalMoney);
        this.chartOptions.seriesBar[0].name = 'tuần 1';
      }
    });
  }

  setChartBar2() {
    this.startDate2 = this.reportService.getParameterStartDate2();
    this.endDate2 = this.reportService.getParameterEndDate2();
    this.reportService.getListStatisticalOneDate2(this.startDate2, this.endDate2).subscribe(chart2 => {
      this.statisticalChart2 = chart2;
      let i;
      for (i = 0; i < this.statisticalChart2.length; i++) {
        // @ts-ignore
        this.chartOptions.seriesBar[1].data.push(this.statisticalChart2[i].totalMoney);
        this.chartOptions.seriesBar[1].name = 'tuần 2';
      }
    });
  }

  paintChartTypeBar() {
    this.chartOptions = {
      seriesBar: [
        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        },
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Ngày 1',
          'Ngày 2',
          'Ngày 3',
          'ngày 4',
          'Ngày 5',
          'Ngày 6',
          'Ngày 7'
        ]
      },
      yaxis: {
        title: {
          text: 'Hello',
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter(val) {
            return '$ ' + val + ' thousands';
          }
        }
      }
    };
  }
}
