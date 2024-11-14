import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { OtpTypeComponent } from './otp-type.component';
// import { HeaderPageRoutingModule } from './header-routing.module';




const routes: Routes = [
  {
    path: '',
    component: OtpTypeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OtpTypeComponent],
  exports: [
    OtpTypeComponent
  ]

})
export class OTPTypePageModule {}