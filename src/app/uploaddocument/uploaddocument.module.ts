import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploaddocumentPageRoutingModule } from './uploaddocument-routing.module';

import { UploaddocumentPage } from './uploaddocument.page';
import { HeaderPageModule } from '../component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploaddocumentPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [UploaddocumentPage]
})
export class UploaddocumentPageModule {}
