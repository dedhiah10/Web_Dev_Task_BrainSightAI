import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserServiceService } from './user-service.service';
import { DbCommsService } from './db-comms.service';
import { Router } from '@angular/router';

const signInAPI = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAISdLSRiG9KS2slGW5gT6eKSHB1Z76IGE';
const signUpAPI = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAISdLSRiG9KS2slGW5gT6eKSHB1Z76IGE';

export interface SigningResponseData {
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:number;
  localId:string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  signUpData!: SigningResponseData;

  constructor(
    private http: HttpClient, 
    private userServce: UserServiceService, 
    private dbComms: DbCommsService,
    private router: Router
    ) { 
      
    }

  signUpFunc(userName:string, pWord:string) {
    this.http.post<SigningResponseData>(signUpAPI,{
      email: userName,
      password: pWord,
      returnSecureToken: true
    }).subscribe(respData => {
      this.userAdd(respData)
      this.dbComms.fetchPreviousApplicationsFromBack();
      setTimeout(() => {this.router.navigate(['form'])}, 500)
    });
  }

  signInFunc(userName:string, pWord:string) {
    this.http.post<SigningResponseData>(signInAPI,{
      email: userName,
      password: pWord,
      returnSecureToken: true
    }).subscribe(respData => {
      this.userAdd(respData);
      this.dbComms.fetchPreviousApplicationsFromBack();
      setTimeout(() => {this.router.navigate(['form'])}, 500)
    });
    
    // Code Used for DB data Init
    //setTimeout(()=>{this.dbComms.initDBData()}, 2000)
  }

  userAdd(respData:any) {
    const expirationDate = new Date(new Date().getTime() + ((+respData.expiresIn)*1000) - 2000);
      const user: User = new User(respData.email, respData.localId, respData.idToken, expirationDate);
      this.userServce.addUser(user);
  }

  //did not add functionality to store user login data to local storage
}