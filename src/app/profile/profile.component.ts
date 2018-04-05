import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute, private db:AngularFireDatabase) { }
  routeParam;
  itemRef;
  item;
  isLoading=true;
  ngOnInit() {
   this.isLoading=true;
    this.route.paramMap
    .subscribe(value=>{
     this.routeParam=value.get('id');
      this.itemRef=this.db.list('profiles/'+this.routeParam)
      .subscribe(data=>{
        console.log(data)
        this.item = data[0];
        this.isLoading=false;
      })
      
    });
  }

}
