import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicenseformPageRoutingModule } from './licenseform-routing.module';

import { LicenseformPage } from './licenseform.page';
import { HeaderPageModule } from './../component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicenseformPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [LicenseformPage]
})
export class LicenseformPageModule {}
