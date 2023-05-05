import { Component, OnInit } from '@angular/core';
import { SideNavItem } from 'src/app/Models/model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  sideNavContent:SideNavItem[]=[
    {
      title:'View Books',
      link:'books/library'
    },
    {
      title:'Manage Books',
      link:'manage/books'
    },
    {
      title:'Manage Categories',
      link:'manage/categories'
    },
    {
      title:'Return Books',
      link:'books/return'
    },
    {
      title:'View Users',
      link:'users/list'
    },
    {
      title:'All orders',
      link:'users/all-orders'
    },
    {
      title:'My orders',
      link:'users/order'
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
