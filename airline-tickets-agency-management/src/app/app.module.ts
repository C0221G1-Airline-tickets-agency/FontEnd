import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Overlay, ToastrModule, ToastrService} from 'ngx-toastr';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {httpInterceptorProviders} from './service/auth/auth-interceptor';
import {AdminAuthService} from './service/auth/admin-auth.service';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UserModule} from './user/user.module';
import {CommonClientModule} from './common/common-client/common-client.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    UserModule,
    CommonClientModule,
    ToastrModule.forRoot()
  ],
  providers: [FormBuilder, DatePipe, MatDialog, Overlay, httpInterceptorProviders, AdminAuthService],

  bootstrap: [AppComponent]
})
export class AppModule {
}
