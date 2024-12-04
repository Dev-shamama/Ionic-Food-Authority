import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UiPageRoutingModule } from './ui-routing.module';

import { UiPage } from './ui.page';
import { HeaderPageModule } from '../component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UiPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [UiPage]
})
export class UiPageModule {}
