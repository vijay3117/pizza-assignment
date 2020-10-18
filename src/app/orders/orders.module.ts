import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';

const routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];
@NgModule({
  declarations: [
    OrdersComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    OrdersComponent,
    DetailsComponent,
    MatTableModule,
    NgbModule,
    RouterModule,
    FormsModule
  ]
})
export class OrdersModule { }
