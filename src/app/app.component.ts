import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        // Initial state of new route
        query(':enter',
          style({
            position: 'fixed',
            width:'100%',
            transform: 'translateY(-70%)',
            opacity:'0'
          }),
          {optional:true}),

        // move page off screen right on leave
        query(':leave',
          animate('500ms ease',
            style({
              position: 'fixed',
              width:'100%',
              transform: 'translateY(70%)',
              opacity:'0',
            })
          ),
        {optional:true}),

        // move page in screen from left to right
        query(':enter',
          animate('500ms ease',
            style({
              opacity: 1,
              transform: 'translateY(0%)'
            })
          ),
        {optional:true}),
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  constructor(private auth:AngularFireAuth, private db:AngularFireDatabase, private router:Router,private snackBar: MatSnackBar){}
  user;
  itemRef;
  ngOnInit()
  {
    this.auth.authState
    .subscribe(prof=>{
      if(prof) this.user=prof;
    })
  }
  logOut()
  {
    this.snackBar.open('Logged Out', 'You\'re a guest now!', {duration:2000});
    this.auth.auth.signOut();
    this.user=null;
    this.router.navigate(['welcome']);
  }
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }
}
