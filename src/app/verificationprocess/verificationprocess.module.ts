import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationprocessPageRoutingModule } from './verificationprocess-routing.module';

import { VerificationprocessPage } from './verificationprocess.page';
import { HeaderPageModule } from '../component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationprocessPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [VerificationprocessPage]
})
export class VerificationprocessPageModule {}
