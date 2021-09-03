import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SideBarComponent } from './common/side-bar/side-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
