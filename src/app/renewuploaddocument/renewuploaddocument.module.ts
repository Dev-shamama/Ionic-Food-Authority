import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenewuploaddocumentPageRoutingModule } from './renewuploaddocument-routing.module';

import { RenewuploaddocumentPage } from './renewuploaddocument.page';
import { HeaderPageModule } from '../component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenewuploaddocumentPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [RenewuploaddocumentPage]
})
export class RenewuploaddocumentPageModule {}
