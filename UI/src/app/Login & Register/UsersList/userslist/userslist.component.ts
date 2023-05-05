import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/model';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  users:User[]=[];
  columnsToDisplay:string[]=[
    'id',
    'name',
    'email',
    'mobile',
    'fine',
    'blocked',
    'active',
    'created on',
    'action'
  ]
  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe({
      next: (res: User[]) => {
        this.users = [];
        this.users = res;
      },
      error: (err: any) => console.log(err),
    });
  }

  blockUser(user: User) {
    if (user.blocked) {
      this.service.unblockUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.blocked = false;
        },
        error: (err: any) => console.log(err),
      });
    } else {
      this.service.blockUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.blocked = true;
        },
        error: (err: any) => console.log(err),
      });
    }
  }

  enableUser(user: User) {
    if (user.active) {
      this.service.disableUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.active = false;
        },
        error: (err: any) => console.log(err),
      });
    } else {
      this.service.enableUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.active = true;
        },
        error: (err: any) => console.log(err),
      });
    }
  }
}