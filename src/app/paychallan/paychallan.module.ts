import { HeaderPageModule } from './../component/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaychallanPageRoutingModule } from './paychallan-routing.module';

import { PaychallanPage } from './paychallan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaychallanPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [PaychallanPage]
})
export class PaychallanPageModule {}
