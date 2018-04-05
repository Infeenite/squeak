import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth:AngularFireAuth, private router:Router) { }
  canActivate()
  { 
  var user = firebase.auth().currentUser;
  if(user){
    return true;
  }
  else{
    this.router.navigate(['welcome']);
    return false;
  }
  }
}
