import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicenseviewPageRoutingModule } from './licenseview-routing.module';

import { LicenseviewPage } from './licenseview.page';
import { HeaderPageModule } from '../component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicenseviewPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [LicenseviewPage]
})
export class LicenseviewPageModule {}
