import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/model';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  listOfOrders:Order[]=[];
  columns:string[]=['id','name','bookid','book','date','returned'];

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    let userid=this.service.getTokenUserInfo()?.id??0;
    this.service.getOrdersOfUser(userid).subscribe({
      next:(res:Order[])=>{
        console.log(res);
        this.listOfOrders=res;
      },
      error:(err:any)=>console.log(err),
    })
  }

}
