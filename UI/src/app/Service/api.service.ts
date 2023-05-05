import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, Order, User, UserType } from '../Models/model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL="https://localhost:7137/api/Library"

  constructor(private http:HttpClient,private jwt:JwtHelperService) { }

  createAccount(user:User)
  {
   return this.http.post(this.baseURL+'/CreateAccount',user,{responseType:'text'})
  }

  login(loginInfo:any)
  {
    let params=new HttpParams()
    .append('email',loginInfo.email)
    .append('password',loginInfo.password);
    return this.http.get(this.baseURL+'/Login',{
      params:params,
      responseType:'text'
    })
  }

  saveToken(token:string)
  {
    localStorage.setItem('access_item',token);
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('access_item');
  }

  deleteToken(){
    localStorage.removeItem('access_item');
    location.reload();
  }

  getTokenUserInfo():User | null 
  {
    if(!this.isLoggedIn()) return null;
    let token=this.jwt.decodeToken();
    let user:User = {
      id:token.id,
      firstName:token.firstName,
      lastName:token.lastName,
      email:token.email,
      mobile:token.mobile,
      password:'',
      blocked:token.blocked =='true',
      active:token.active == 'true',
      createdOn:token.createdAt,
      fine:0,
      userType:token.userType === 'USER'? UserType.USER : UserType.ADMIN
    };
    return user;
  }

  getAllBooks()
  {
    return this.http.get<Book[]>(this.baseURL+'/GetAllBooks');
  }

  orderBook(userId:number,bookId:number)
  {
    return this.http.get(this.baseURL+'/OrderBook/'+userId+'/'+bookId,{
      responseType:'text'
    });
  }

  getOrdersOfUser(userid:number)
  {
    return this.http.get<Order[]>(this.baseURL+'/GetOrders/'+userid
    )
  }
  getAllOrders(){
    return this.http.get<Order[]>(this.baseURL+'/GetAllOrders');
  }

  returnBook(bookId:string,userId:string)
  {
    return this.http.get(this.baseURL+'/ReturnBook/'+bookId+'/'+userId,{
      responseType:'text'
    })
  }
  getAllUsers() {
    return this.http.get<User[]>(this.baseURL + '/GetAllUsers').pipe(
      map((users) =>
        users.map((user) => {
          let temp: User = user;
          temp.userType = user.userType == 0 ? UserType.USER : UserType.ADMIN;
          return temp;
        })
      )
    );
  }

  blockUser(id: number) {
    return this.http.get(this.baseURL + '/ChangeBlockStatus/1/' + id, {
      responseType: 'text',
    });
  }

  unblockUser(id: number) {
    return this.http.get(this.baseURL + '/ChangeBlockStatus/0/' + id, {
      responseType: 'text',
    });
  }

  enableUser(id: number) {
    return this.http.get(this.baseURL + '/ChangeEnableStatus/1/' + id, {
      responseType: 'text',
    });
  }

  disableUser(id: number) {
    return this.http.get(this.baseURL + '/ChangeEnableStatus/0/' + id, {
      responseType: 'text',
    });
  }

  insertBook(book:any)
  {
    return this.http.post(this.baseURL+'/InsertBook',book,{
      responseType:'text'
    })
  }

  deleteBook(id:number)
  {
    return this.http.delete(this.baseURL+'/Deletebook/'+id,{
      responseType:'text'
    })
  }

  insertCategory(category:string,subcategory:string)
  {
    return this.http.post(
      this.baseURL+'/InsertCategory',{
        category:category,subCategory:subcategory},
        {
          responseType:'text'
        }
      
    );
  }
}

