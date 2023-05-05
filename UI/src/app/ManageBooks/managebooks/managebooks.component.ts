import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-managebooks',
  templateUrl: './managebooks.component.html',
  styleUrls: ['./managebooks.component.css']
})
export class ManagebooksComponent implements OnInit {

  addBookForm:FormGroup;
  deleteBookForm:FormControl;

  addMsg:string=''
  deleteMsg:string=''
  constructor(private fb:FormBuilder,private service:ApiService) {
    this.addBookForm=fb.group({
      title:fb.control('',[Validators.required]),
      author:fb.control('',[Validators.required]),
      category:fb.control('',[Validators.required]),
      subcategory:fb.control('',[Validators.required]),
      price:fb.control('',[Validators.required]),
    });

    this.deleteBookForm=fb.control('',[Validators.required]);
   }


   insertBook(){
    let book={
      id:0,
      title:this.Title.value,
      category:{
        category:this.Category.value,
        subCategory:this.SubCategory.value
      },
      price:this.Price.value,
      available:true,
      author:this.Author.value,
    };
    this.service.insertBook(book).subscribe({
      next:(res:any)=>{
        this.addMsg='Book Inserted';
        setInterval(()=>(this.addMsg=''),5000);
        this.Title.setValue('');
        this.Author.setValue('');
        this.Category.setValue('');
        this.SubCategory.setValue('');
        this.Price.setValue('');
      },
      error:(err:any)=>console.log(err),
    })
   }
   deleteBook(){
    let id:number=parseInt(this.deleteBookForm.value); 

    this.service.deleteBook(id).subscribe({
      next:(res:any)=>{
        if( res === 'success'){
          this.deleteMsg='Book Deleted Successfully';
        }
        else{
          this.deleteMsg="Book Not Found!";
        }
        setInterval(()=>(this.deleteMsg=''),5000);
      },
      error:(err:any)=>console.log(err),
    });
   }

   get Title():FormControl{
    return this.addBookForm.get('title') as FormControl;
   }
   get Author():FormControl{
    return this.addBookForm.get('author') as FormControl;
   }
   get Category():FormControl{
    return this.addBookForm.get('category') as FormControl;
   }
   get SubCategory():FormControl{
    return this.addBookForm.get('subcategory') as FormControl;
   }
   get Price():FormControl{
    return this.addBookForm.get('price') as FormControl;
   }

  ngOnInit(): void {
  }

}
