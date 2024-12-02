import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetpasswordPageRoutingModule } from './forgetpassword-routing.module';

import { ForgetpasswordPage } from './forgetpassword.page';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetpasswordPageRoutingModule,
    MaskitoDirective
  ],
  declarations: [ForgetpasswordPage]
})
export class ForgetpasswordPageModule {}
