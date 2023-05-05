import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide=true;
  responseMessage:string='';
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private service:ApiService,private route:Router) {
    this.loginForm=this.fb.group({
      email:fb.control('',[Validators.required,Validators.email]),
      password:fb.control('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ])
    })
   }

  ngOnInit(): void {
  }

  login(){
    let loginInfo={
      email:this.loginForm.get('email')?.value,
      password:this.loginForm.get('password')?.value
    };
    this.service.login(loginInfo).subscribe({
      next:(res:any)=>{
        if(res.toString() === 'Invalid')
        {
          this.responseMessage= 'Invalid Credentials!'
        }
        else{
          this.responseMessage='';
          this.service.saveToken(res.toString());
          let isActive=this.service.getTokenUserInfo()?.active ?? false;
          if(isActive)
            this.route.navigateByUrl('/books/library');
          else{
            this.responseMessage='You are not Active';
            this.service.deleteToken();
          } 
            console.log('logged in successfully');
        }
      }
    })
    this.loginForm.reset();
  }

  get Email():FormControl{
    return this.loginForm.get('email') as FormControl
  }
  get Password():FormControl{
    return this.loginForm.get('password') as FormControl
  }
}
