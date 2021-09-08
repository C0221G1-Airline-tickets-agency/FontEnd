import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './common/footer/footer.component';

import {SideBarComponent} from './common/side-bar/side-bar.component';
import {HeaderComponent} from './common/header/header.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Overlay, ToastrModule, ToastrService} from 'ngx-toastr';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserModule} from './user/user.module';
import {CommonClientModule} from './common/common-client/common-client.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserModule,
    CommonClientModule,
    ToastrModule.forRoot()
  ],
  providers: [FormBuilder, DatePipe, MatDialog, Overlay],
  bootstrap: [AppComponent]
})
export class AppModule {
}
