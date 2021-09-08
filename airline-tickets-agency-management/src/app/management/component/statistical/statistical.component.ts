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
  ApexXAxis,
  // Top
  ApexTooltip
} from 'ng-apexcharts';
import {Report} from '../../../model/report';
import {ReportService} from '../../../service/report/report.service';

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
  // Top bar
  seriesBarTop: ApexAxisChartSeries;
  colors: string[];
  subtitle: ApexTitleSubtitle;
  // Top circle
  seriesCircleTop: ApexNonAxisChartSeries;
  labelsTopCircle: any;
  labelsCircle: string[];
  // Top Line
  seriesLineTop: ApexAxisChartSeries;
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
  isTopBar = false;
  isTopCircle = false;
  isTopLine = false;
  week1 = 'Tuần 1';
  week2 = 'Tuần 2';
  isEmployee = false;
  isAirline = false;
  categories = [
    'Ngày 1',
    'Ngày 2',
    'ngày 3',
    'Ngày 4',
    'Ngày 5',
    'ngày 6',
    'Ngày 7'
  ];
  topEmployee = 'Top 5 nhân viên Bán được nhiều vé nhất';
  topAirline = 'Top 5 hãng hàng không bán được nhiều vé nhất';

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
    // this.paintChartTypeLineTop();
    this.showChart();
    // this.paintChartTypeTop();
    // this.paintChartTypeLine();
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
          return;
        case 'bar':
          this.isBar = true;
          this.setChartBar1();
          this.setChartBar2();
          this.paintChartTypeBar();
          return;
        default:
          this.isBar = false;
          this.isLine = false;
          this.isCircle = false;
          return;
      }
    }
    if (this.typeReport === 'employee' || this.typeReport === 'airline') {
      switch (this.typeChart) {
        case 'bar':
          this.isTopBar = true;
          this.paintChartTypeBarTop();
          this.setChartBarTop();
          return;
        case 'circle':
          this.isTopCircle = true;
          this.paintChartTypeCircleTop();
          this.setChartCircleTop();
          return;
        case 'line':
          this.isTopLine = true;
          this.paintChartTypeLineTop();
          this.setChartLineTop();
          return;
        default:
          this.isTopCircle = false;
          this.isTopLine = false;
          this.isTopBar = false;
          this.isBar = false;
          this.isLine = false;
          this.isCircle = false;
          return;
      }
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
          data: [12000, 1000, 21000, 11000, 14000, 2000, 11000]
        },
        {
          name: 'tuần 2',
          data: [3000, 1500, 21000, 16000, 15000, 10000, 11000, 16000]
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
        categories: [
          'Ngày 1',
          'Ngày 2',
          'ngày 3',
          'Ngày 4',
          'Ngày 5',
          'ngày 6',
          'Ngày 7'
        ]
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
        // width: 480,
        type: 'pie'
      },
      labels: ['tuần 1', 'Tuần 2'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              // width: 200
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
        this.chartOptions.seriesBar[0].name = 'Thời gian 1';
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
        this.chartOptions.seriesBar[1].name = 'Thời gian 2';
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
        enabled: false
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
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter(val) {
            return val + ' VND';
          }
        }
      }
    };
  }

// Top bar
  setChartBarTop() {
    this.startDate1 = this.reportService.getParameterStartDate1();
    this.endDate1 = this.reportService.getParameterEndDate1();
    this.typeReport = this.reportService.getParameterTypeReport();
    console.log(this.typeReport);
    if (this.typeReport === 'employee') {
      this.reportService.getTop5Employee(this.startDate1, this.endDate1).subscribe(chart1 => {
        this.statisticalChart1 = chart1;
        let i;
        for (i = 0; i < this.statisticalChart1.length; i++) {
          // @ts-ignore
          this.chartOptions.seriesBarTop[0].data.push(this.statisticalChart1[i].quantity);
          this.chartOptions.xaxis.categories.push(this.statisticalChart1[i].employeeName);
        }
      });
      this.chartOptions.title.text = 'Top hãng nhân viên bán được nhiều vé nhất';
    }
    if (this.typeReport === 'airline') {
      this.reportService.getTop5Airline(this.startDate1, this.endDate1).subscribe(chart1 => {
        this.statisticalChart1 = chart1;
        let i;
        for (i = 0; i < this.statisticalChart1.length; i++) {
          // @ts-ignore
          this.chartOptions.seriesBarTop[0].data.push(this.statisticalChart1[i].quantity);
          this.chartOptions.xaxis.categories.push(this.statisticalChart1[i].airlineName);
        }
      });
      this.chartOptions.title.text = 'Top hãng máy bay bán được nhiều vé nhất';
    }
  }

  paintChartTypeBarTop() {
    this.chartOptions = {
      seriesBarTop: [
        {
          data: []
        }
      ],
      chart: {
        type: 'bar',
        // height: 400
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          }
        }
      },
      colors: [
        '#33b2df',
        '#546E7A',
        '#d4526e',
        '#13d8aa',
        '#A5978B',
        '#2b908f',
        '#f9a3a4',
        '#90ee7e',
        '#f48024',
        '#69d2e7'
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter(val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
        text: '',
        align: 'center',
        floating: true
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          title: {
            formatter() {
              return '';
            }
          }
        }
      }
    };
  }

// Top Circle
  setChartCircleTop() {
    this.startDate1 = this.reportService.getParameterStartDate1();
    this.endDate1 = this.reportService.getParameterEndDate1();
    this.typeReport = this.reportService.getParameterTypeReport();
    if (this.typeReport === 'employee') {
      this.reportService.getTop5Employee(this.startDate1, this.endDate1).subscribe(chart1 => {
        this.statisticalChart1 = chart1;
        let i;
        for (i = 0; i < this.statisticalChart1.length; i++) {
          // @ts-ignore
          this.chartOptions.seriesCircleTop.push(Number(this.statisticalChart1[i].quantity));
          this.chartOptions.labelsCircle.push(this.statisticalChart1[i].employeeName);
        }
      });
    }
    if (this.typeReport === 'airline') {
      this.reportService.getTop5Airline(this.startDate1, this.endDate1).subscribe(chart1 => {
        this.statisticalChart1 = chart1;
        let i;
        for (i = 0; i < this.statisticalChart1.length; i++) {
          // @ts-ignore
          this.chartOptions.seriesCircleTop.push(Number(this.statisticalChart1[i].quantity));
          this.chartOptions.labelsCircle.push(this.statisticalChart1[i].airlineName);
        }
      });
    }
  }

  paintChartTypeCircleTop() {
    this.chartOptions = {
      seriesCircleTop: [],
      chart: {
        // width: 380,
        type: 'pie'
      },
      labelsCircle: [],
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

  // Top Line
  setChartLineTop() {
    this.startDate1 = this.reportService.getParameterStartDate1();
    this.endDate1 = this.reportService.getParameterEndDate1();
    this.typeReport = this.reportService.getParameterTypeReport();
    if (this.typeReport === 'employee') {
      this.reportService.getTop5Employee(this.startDate1, this.endDate1).subscribe(chart1 => {
        this.statisticalChart1 = chart1;
        let i;
        for (i = 0; i < this.statisticalChart1.length; i++) {
          // @ts-ignore
          this.chartOptions.seriesLineTop[i].name = (this.statisticalChart1[i].employeeName);
          // @ts-ignore
          this.chartOptions.seriesLineTop[i].data.push(Number(this.statisticalChart1[i].quantity));
        }
      });
      this.chartOptions.title.text = this.topEmployee;
    }
    if (this.typeReport === 'airline') {
      this.reportService.getTop5Airline(this.startDate1, this.endDate1).subscribe(chart1 => {
        this.statisticalChart1 = chart1;
        let i;
        for (i = 0; i < this.statisticalChart1.length; i++) {
          // @ts-ignore
          this.chartOptions.seriesLineTop[i].name = (this.statisticalChart1[i].airlineName);
          // @ts-ignore
          this.chartOptions.seriesLineTop[i].data.push(Number(this.statisticalChart1[i].quantity));
        }
      });
      this.chartOptions.title.text = this.topAirline;
    }
  }

  paintChartTypeLineTop() {
    this.chartOptions = {
      seriesLineTop: [
        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        }
      ],
      chart: {
        // height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: '',
        align: 'center',
        floating: true
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
    };
  }
}
