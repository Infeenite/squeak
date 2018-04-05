import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UploadService } from '../upload.service';
import { Upload } from '../upload';
import * as _ from "lodash";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user:any;
  profileProps:any;
  selectedFiles: FileList;
  currentUpload: Upload;
  itemRef;
  aboutMe;
  color;
  phone;
  constructor(private auth:AngularFireAuth, private db: AngularFireDatabase, private router:Router, private upSvc: UploadService, private snackBar:MatSnackBar) { }
  
  ngOnInit() {
      this.auth.authState.subscribe(prof=>{
       this.user = prof;
        console.log(this.user.uid);
       this.itemRef = this.db.list('profiles/'+this.user.uid).subscribe(data=>{
        this.profileProps = data[0];
      })
      })
    
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
}

uploadSingle() {
  let file = this.selectedFiles.item(0);
  this.currentUpload = new Upload(file);
  console.log(this.currentUpload);
  this.upSvc.pushUpload(this.currentUpload);
  this.db.list('uploads').subscribe(x=>{
    this.db.object('profiles/'+this.user.uid+'/'+this.profileProps.$key).update({
      avatar:x[x.length-1].url
    })
  })
  this.confirmChanges();
}

updatePhoneNumber(value)
{
  this.db.object('profiles/'+this.user.uid+'/'+this.profileProps.$key).update({
    phone:value
  })
  this.confirmChanges();
}
updateAboutMe(value)
{
  this.db.object('profiles/'+this.user.uid+'/'+this.profileProps.$key).update({
    about:value
  })
  this.confirmChanges();
}
changeColor(color)
{
  this.db.object('profiles/'+this.user.uid+'/'+this.profileProps.$key).update({
    accentColor:color
  })
  this.confirmChanges();
}
confirmChanges()
{
this.snackBar.open('Changed!', 'Your data has been updated.', {duration:2000})
}

}