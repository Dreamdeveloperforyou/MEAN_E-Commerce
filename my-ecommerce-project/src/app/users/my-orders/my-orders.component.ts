import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  currentUser: any;
  myOrder:any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getMyOrder();
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem('user');
  }

  getMyOrder() {
    if(this.currentUser){
      console.log(this.currentUser);      
      this.orderService.getOrder({ user: this.currentUser }).subscribe(
        res => {
          console.log(res);          
          this.myOrder = res.data;       
        }, 
        error => console.log(error)
      );
    }   
  }

}
