import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuClicked=new EventEmitter<boolean>();

  userName:any;
  constructor(private service:ApiService) { }

  ngOnInit(): void {
   this.userName= this.service.getTokenUserInfo()?.firstName
   console.log(this.userName);
  }
  
  logOut()
  {
    this.service.deleteToken();
    console.log("logged out successfully")
  }

}

