import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private route:ActivatedRoute, private auth:AngularFireAuth, private db:AngularFireDatabase, private router:Router) { }
  routeParam;
  lockdown;
  group;
  membersCount;
  isLoading;
  posts;

  ngOnInit() {
    this.isLoading=true;
    this.route.paramMap
    .subscribe(value=>{
     this.routeParam=value.get('id');

     this.auth.authState
      .subscribe(data=>{

        //Checking if current user is a member
        this.db.object('groups/'+this.routeParam).subscribe(group=>{
          if(group.members.includes(data.uid)) {
            this.lockdown=false;
            this.group=group;
            this.membersCount = this.group.members.length - 1;
            this.isLoading=false;
              this.db.list('groups/'+this.routeParam+'/posts').subscribe(posts=>{
                this.posts=posts;
              })
          }
        })
      })



  });
}
  navigate(uid)
  {
    this.router.navigate(['profile/'+uid]);
  }

}
