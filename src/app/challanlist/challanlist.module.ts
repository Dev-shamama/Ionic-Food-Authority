import { HeaderPageModule } from './../component/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChallanlistPageRoutingModule } from './challanlist-routing.module';

import { ChallanlistPage } from './challanlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChallanlistPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [ChallanlistPage]
})
export class ChallanlistPageModule {}
