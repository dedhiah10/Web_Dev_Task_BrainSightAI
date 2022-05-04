import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) { }

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return '';
    }
    else { return this._token; }
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private usersArray: User[] = [];
  private currentUser: User|null = null;
  private loggedIn: boolean = false;
  private folderName: string|null = null;

  constructor() {
    interval(200).subscribe(() => {
      if (this.usersArray.length > 0 && this.usersArray[this.usersArray.length - 1].token == (''||null)) {
          this.loggedIn = false
          this.currentUser = null;
      } else {
        this.currentUser = this.usersArray[this.usersArray.length - 1];
      }
    })
  }


  public get loggedInStatus(): boolean { return this.loggedIn; }


  getUserToken(): string {
    if (this.loggedIn) {
      return this.usersArray[this.usersArray.length - 1].token;
    } else {return '';}
  }

  getEmailId(): string {
    return this.usersArray[this.usersArray.length - 1].email;
  }

  getFolderName():string {
    if(this.folderName=(null||'')) {
      if(this.currentUser != null) {
        let temp: string[] = this.currentUser.email.split('.');
        console.log(temp);
        if(temp.length > 1) {
          for(let i = 0; i < temp.length; i++) { temp[0] += temp[i]; }
        }
        this.folderName = temp[0];
      }
    }
    return this.folderName;
  }

  addUser(user: User) {
    this.usersArray.push(user);
    this.loggedIn = true;
  }

  validUserAvail(): boolean {
    if (this.usersArray.length <= 0) {
      return false;
    } else if (this.usersArray[this.usersArray.length - 1].token == (null || '')) {
      return false;
    } else { return true; }
  }
}
