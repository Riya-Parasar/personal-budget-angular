import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit{
  constructor(private dataService: DataService) { }

  private data = [] as any[];
  private dataSource = {
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

  private svg: any;
  private margin = 50;
  private width = 550;
  private height = 500;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  private createSvg(): void {
    this.svg = d3.select("#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.title.toString()))
    .range(['#ffcd56',
    '#ff6384',
    '#36a2eb',
    '#fd6b19',
    'green',
    'purple',
    'red']);
  }

  private drawChart(data: any[]): void {
    console.log(data);
    const graph = d3.pie<any>().value((d: any) => Number(d.budget));

    this.svg
    .selectAll('pieces')
    .data(graph(data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#ffffff")
    .style("stroke-width", "1px");

    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(graph(data))
    .enter()
    .append('text')
    .text((d: any)=> d.data.title)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }

  createData(): void {
   this.dataService.getData().then((data)=>{
    console.log(data);
    this.dataSource = data;
    const budget = this.dataSource.datasets[0].data;
    const titles = this.dataSource.labels;
    this.data = titles.map((title, index) => {
      return {
        title: title,
        budget: budget[index]
      };
    });
    this.createSvg();
    this.createColors();
    this.drawChart(this.data);
    });


  }

  ngOnInit(): void {
    this.createData();

  }
}
