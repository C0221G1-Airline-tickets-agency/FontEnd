import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Overlay, ToastrModule} from 'ngx-toastr';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClientModule} from './client/client.module';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {httpInterceptorProviders} from './service/auth/auth-interceptor';
import {AdminAuthService} from './service/auth/admin-auth.service';



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
    ToastrModule.forRoot(),
    MatSnackBarModule
  ],
  providers: [FormBuilder, DatePipe, MatDialog, Overlay, httpInterceptorProviders, AdminAuthService],

  bootstrap: [AppComponent]
})
export class AppModule {
}
