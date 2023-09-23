import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

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

  private myBudget = [] as any[];

  constructor(private http: HttpClient) {
    if (this.myBudget.length === 0) {
      this.fetchDataFromBackend();
    }
  }
  fetchDataFromBackend() {

    return new Promise((resolve, reject)=>{
      this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {

        for (var i = 0; i < res.myBudget.length; i++){
          this.myBudget[i] = res.myBudget[i];
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        resolve(this.dataSource);
      },(error)=>{
        reject(error);
      });
    })

  }
  getData(): Promise<any>{
    if (this.myBudget.length === 0) {
      return this.fetchDataFromBackend();
    }
    return Promise.resolve(this.dataSource);
  }
}
