import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  orderDetails: any = {};
  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.actRoute.snapshot.params.id;
    this.orderDetails = {};
    const getDatasource = localStorage.getItem('orders');
    if (getDatasource) {
      const data = JSON.parse(getDatasource);
      for (const orderdata of data) {
        if (orderdata.id === parseFloat(id)) {
          this.orderDetails = orderdata;
          break;
        }
      }
      console.log( this.orderDetails);
    }

  }

}
