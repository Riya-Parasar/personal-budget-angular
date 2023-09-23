/*import { Component, OnInit, AfterViewInit, NgZone, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit{

  public dataSource : any = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56' ,
                '#ff6384' ,
                '#36a2eb' ,
                '#fd6b19' ,
            ],
        }
    ],
    labels: [

    ]
};
  constructor(private el: ElementRef, private ngZone: NgZone, private http: HttpClient)
  {

  }

  ngAfterViewInit(): void {


    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {

      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.createChart();
    }

    });

  }

  createChart() {
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}



}*/

import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit{

  public dataSource = {
    datasets: [
        {
            data: [] as any[],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                'green',
                'purple',
                'red',
            ]
        }
    ],
    labels: [] as any[]
  };

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  ngAfterViewInit(): void {
    this.createChart();

  }

  createChart() {
    this.dataService.getData().then((data)=>{
      this.dataSource=data;
      var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
    });

  }
}
