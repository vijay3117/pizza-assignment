import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderForm: FormGroup;
  submitted = false;
  modalRef;
  displayedColumns: string[] = ['customerName', 'noOfItems', 'price', 'status'];
  dataSource = [];
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      orderName: ['', Validators.required],
      customerName: ['', Validators.required],
      noOfItems: ['', Validators.required],
      price: ['', Validators.required],
      total: ['', Validators.required],
      status: ['', Validators.required],
      address: ['', Validators.required]
    });

    const getDatasource = localStorage.getItem('orders');
    if (getDatasource) {
      this.dataSource = [...JSON.parse(getDatasource)];
    }

    const totalAmunt = { price: 0, items: 0 };
    this.orderForm.get('price').valueChanges.subscribe(val => {
      totalAmunt.price = val;
      this.orderForm.controls.total.setValue(totalAmunt.items * totalAmunt.price);
    });
    this.orderForm.get('noOfItems').valueChanges.subscribe(val => {
      totalAmunt.items = val;
      this.orderForm.controls.total.setValue(totalAmunt.items * totalAmunt.price);
    });
  }


  // Create a order
  createOrder(content): void {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }


  get f(): any { return this.orderForm.controls; }


  onSubmit(): boolean {
    this.submitted = true;

    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }

    const formData = this.orderForm.value;
    formData.id = this.dataSource.length ? this.dataSource.length + 1 : 1;

    this.dataSource.push(formData);
    this.dataSource = [...this.dataSource];
    localStorage.setItem('orders', JSON.stringify(this.dataSource));
    this.modalRef.close();
    this.onReset();
  }

  // Get Status
  getStatus(): void {
    this.dataSource = [...this.dataSource];
    localStorage.setItem('orders', JSON.stringify(this.dataSource));
  }

  onReset(): void {
    this.submitted = false;
    this.orderForm.reset();
  }

}
