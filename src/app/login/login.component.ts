import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm;
  displayName;
  isLoading;
  profession;
  errorMsg;
  email;
  password;
  subProfession;
  birthDate;

  constructor(private auth:AngularFireAuth, private db:AngularFireDatabase, private router:Router) { }

  ngOnInit() {
  }
  detectChange(auth)
  {
    console.log(auth);
    this.authForm=auth;
  }
  detectProfession(prof)
  {
    this.profession=prof;
  }
  register(email, password, displayName, profession, subProfession, birthDate, occupation)
  {

    let bgBanner
      switch(profession){
        case 'Musician': bgBanner="https://firebasestorage.googleapis.com/v0/b/wcffproject.appspot.com/o/musician.jpg?alt=media&token=70c35872-85d1-4591-8cc4-831c8c1ac3b5"
        break;

        case 'Sportsman': bgBanner="https://firebasestorage.googleapis.com/v0/b/wcffproject.appspot.com/o/sportsman.jpg?alt=media&token=d88d5dbd-47e9-4c85-9455-a5999f9f90d3"
        break;

        case 'Programmer': bgBanner="https://firebasestorage.googleapis.com/v0/b/wcffproject.appspot.com/o/programmer.jpg?alt=media&token=f3756ac1-551f-450f-8782-4f2ebcb7bfab"
        break;

        case 'Painter': bgBanner="https://firebasestorage.googleapis.com/v0/b/wcffproject.appspot.com/o/painter.jpg?alt=media&token=a1d7a026-e1a1-4e3f-854f-384436eb15e2"
        break;
      }
      this.isLoading=true;
      this.auth.auth.createUserWithEmailAndPassword(email, password)
      .catch(err=>{
        this.errorMsg=err;
        this.isLoading=false;
      })
        .then(x=>{
          this.auth.auth.signInWithEmailAndPassword(email, password);
          this.auth.authState
          .subscribe(profile=>{
            this.db.list('profiles/' + profile.uid).push({
              email:email,
              name:displayName,
              profession:profession,
              bgBanner:bgBanner,
              subProfession:subProfession,
              birthDate:birthDate,
              occupation:occupation
            })
          this.router.navigate(['settings/'])
          })
       
        });
    }
  login(email, password)
  {
    this.isLoading=true;
    this.auth.auth.signInWithEmailAndPassword(email, password)
      .catch(err=>{
        this.errorMsg=err;
        this.isLoading=false;
      })
      .then(x=>{
        this.auth.authState
          .subscribe(prof=> this.router.navigate(['profile/'+prof.uid]))
      })
  }
   
  
 



}
