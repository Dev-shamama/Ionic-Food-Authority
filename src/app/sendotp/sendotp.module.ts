import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendotpPageRoutingModule } from './sendotp-routing.module';

import { SendotpPage } from './sendotp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendotpPageRoutingModule
  ],
  declarations: [SendotpPage]
})
export class SendotpPageModule {}
