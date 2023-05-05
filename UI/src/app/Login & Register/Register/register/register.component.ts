import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User, UserType } from 'src/app/Models/model';
import { ApiService } from 'src/app/Service/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide=true;
  responseMessage:string='';
  registerForm:FormGroup
  constructor(private fb:FormBuilder,private service:ApiService) {
    this.registerForm=this.fb.group({
      firstName:fb.control('',[Validators.required]),
      lastName: fb.control('', [Validators.required]),
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [
                            Validators.required,
                            Validators.minLength (8),
                            Validators.maxLength (15),
                              ]
                          ),
      cpassword: fb.control(''),
      userType: fb.control('student'),
    },{
      validators:[confirmPasswordValidator]
    } as AbstractControlOptions
    );
   }

  ngOnInit(): void {
  }

  //#region get methods

  get FirstName():FormControl{
    return this.registerForm.get('firstname') as FormControl
  }
  get LastName():FormControl{
    return this.registerForm.get('lastname') as FormControl
  }
  get Email():FormControl{
    return this.registerForm.get('email') as FormControl
  }
  get Password():FormControl{
    return this.registerForm.get('password') as FormControl
  }
  get CPassword():FormControl{
    return this.registerForm.get('cpassword') as FormControl
  }
  //#endregion get methods

  //#region Error Methods

    getFirstNameErrors(){
      if(this.FirstName.hasError('required')) {return 'Field is Required'};
      return 'checking';
    }
    getLasttNameErrors(){
      if(this.LastName.hasError('required')) return 'Field is Required'
      return '';
    }
    
    getEmailErrors(){
      if(this.Email.hasError('required')) return 'Email is Required'
      if(this.Email.hasError('email')) return 'Email is invalid'
      return '';
    }

    getPasswordErrors(){
      if(this.Password.hasError('required')) return 'Password is Required'
      if(this.Password.hasError('minlength')) return 'Minimum 8 characters are required';
      if(this.Password.hasError('maxlength')) return 'Maximum 15 characters are allowed'; 
      return '';
    }

  //#endregion Error Methods

  // Register Method to submit form values
  register(){
    let user:User={
      id:0,
      firstName:this.registerForm.get('firstName')?.value,
      lastName:this.registerForm.get('lastName')?.value,
      email:this.registerForm.get('email')?.value,
      userType:UserType.USER,
      mobile:'',
      password:this.registerForm.get('password')?.value,
      blocked:false,
      active:false,
      createdOn:'',
      fine:0
    }
      this.service.createAccount(user).subscribe({
        next :(res:any) =>{
          console.log(res);
          this.responseMessage=res.toString();
          console.log(this.responseMessage);
        },
        error:(err:any)=>{
          console.log('Error: ');
          console.log(err);
        }
      })
    this.registerForm.reset();
  }



}
export const confirmPasswordValidator:ValidatorFn=(
  control:AbstractControl
):ValidationErrors |null =>{
  const pwd=control.get('password')?.value;
  const cpwd=control.get('cpassword')?.value;
  if(pwd === cpwd)
  {
    control.get('cpassword')?.setErrors(null);
    return null;
  }
  else{
    control.get('cpassword')?.setErrors({cpassword:true})
    return {cpassword:true};
  }
}
