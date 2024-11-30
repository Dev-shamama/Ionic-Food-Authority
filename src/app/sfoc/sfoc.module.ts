import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SfocPageRoutingModule } from './sfoc-routing.module';

import { SfocPage } from './sfoc.page';
import { HeaderPageModule } from '../component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SfocPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [SfocPage]
})
export class SfocPageModule {}
