import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatRadioModule, MatProgressSpinnerModule, MatSnackBarModule, MatTabsModule, MatListModule, MatLineModule,MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, BrowserAnimationsModule,MatRadioModule,MatProgressSpinnerModule, MatSnackBarModule,MatTabsModule,MatListModule,MatLineModule,MatSelectModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatMomentDateModule,MatMenuModule
  ],
})
export class MaterialModule { }
