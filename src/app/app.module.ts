import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { IntroComponent } from './intro/intro.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { UploadService } from './upload.service';
import { AuthGuard } from './auth-service.service';


export const routes =[
  {path:'profile/:id', component: ProfileComponent, data: { animation: 'profile' }},
  {path:'home', component:HomeComponent,canActivate:[AuthGuard],  data: { animation: 'home' }},
  {path:'welcome', component:IntroComponent, data: { animation: 'welcome' }},
  {path:'settings', component:SettingsComponent, canActivate:[AuthGuard], data: { animation: 'settings' }},
  {path:'login', component:LoginComponent, data: { animation: 'login' }},
  {path:'', redirectTo:'home', pathMatch:'full'}
]
export const firebaseConfig = {
  apiKey: "AIzaSyACoKZFvOMRw4FwIK-eFKzbvSVD7Tfa70o",
  authDomain: "wcffproject.firebaseapp.com",
  databaseURL: "https://wcffproject.firebaseio.com",
  projectId: "wcffproject",
  storageBucket: "wcffproject.appspot.com",
  messagingSenderId: "404828531043"
}

@NgModule({
 
  declarations: [
    AppComponent,
    HomeComponent,
    IntroComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,

  ],
  providers: [
    UploadService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
