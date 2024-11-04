import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicensedetailPageRoutingModule } from './licensedetail-routing.module';

import { LicensedetailPage } from './licensedetail.page';
import { HeaderPageModule } from '../component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicensedetailPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [LicensedetailPage]
})
export class LicensedetailPageModule {}
