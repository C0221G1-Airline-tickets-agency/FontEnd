import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../header/header.component';
import {SideBarComponent} from '../side-bar/side-bar.component';
import {ClientRoutingModule} from '../../client/client-routing.module';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ], exports: [
    SideBarComponent,
    FooterComponent,
    HeaderComponent
  ],
})
export class CommonClientModule { }
