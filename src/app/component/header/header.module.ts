import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
// import { HeaderPageRoutingModule } from './header-routing.module';

import {HeaderComponent} from "./header.component"


const routes: Routes = [
  {
    path: '',
    component: HeaderComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ]

})
export class HeaderPageModule {}