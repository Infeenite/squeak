import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AngularFireAuth, private db:AngularFireDatabase, private router:Router) { }

  profile;
  user;
  groups;
  ngOnInit() {
    this.auth.authState.subscribe(data=>{
      this.profile=data; 
        this.db.list('profiles/' + this.profile.uid).subscribe(x=>{
          this.user=x[0];
        });

    this.db.list('groups/', {
      query:{
        orderByChild:'members',
        indexOn:this.profile.uid
      }
    }).subscribe(data=>{
      this.groups = data;
    })
  })
  }

  goToGroup(key)
  {
    this.router.navigate(['group/'+key]);
  }

}
