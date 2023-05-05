import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/model';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  listOfOrders: Order[]=[];
  ordersToDisplay:Order[]=[];
  columns:string[]=[
    'id',
    'userid',
    'name',
    'bookid',
    'book',
    'date',
    'returned'
  ];
  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.service.getAllOrders().subscribe({
      next:(res:Order[])=>{
        this.listOfOrders=res;
        this.ordersToDisplay=this.listOfOrders;
        console.log(this.ordersToDisplay);
      },
      error:(err:any)=>console.log(err),
    })
  }

  filter(value:string)
  {
    if(value === 'all')
    {
      this.ordersToDisplay=this.listOfOrders.filter((value)=>value);
    }
    else if(value === 'pen')
    {
      this.ordersToDisplay=this.listOfOrders.filter(
        (value)=>value.returned == false
      );
    }
    else{
      this.ordersToDisplay = this.listOfOrders.filter(
        (value)=>value.returned

      );
    }
  }

}
