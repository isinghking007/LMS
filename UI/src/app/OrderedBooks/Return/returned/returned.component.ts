import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-returned',
  templateUrl: './returned.component.html',
  styleUrls: ['./returned.component.css']
})
export class ReturnedComponent implements OnInit {

  status=''
  bookForm:FormGroup;
  constructor(private service:ApiService,private fb:FormBuilder) {

    this.bookForm=this.fb.group({
      bookId:fb.control('',[Validators.required]),
      userId:fb.control('',[Validators.required])
    });
    }

  ngOnInit(): void {
  }

  returnBook()
  {
    let book=(this.bookForm.get('bookId') as FormControl).value;
    let user=(this.bookForm.get('userId') as FormControl).value;
    this.service.returnBook(book,user).subscribe({
      next:(res:any) =>{
        if(res === 'success')
          this.status= 'Book Returned!';
        else
          this.status=res;
      },
      error:(err:any) =>console.log(err),
    })
  }
}
