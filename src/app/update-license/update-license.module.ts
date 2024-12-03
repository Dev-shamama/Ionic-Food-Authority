import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateLicensePageRoutingModule } from './update-license-routing.module';

import { UpdateLicensePage } from './update-license.page';
import { MaskitoDirective } from '@maskito/angular';
import { HeaderPageModule } from '../component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateLicensePageRoutingModule,
    HeaderPageModule,
    MaskitoDirective
  ],
  declarations: [UpdateLicensePage]
})
export class UpdateLicensePageModule {}
