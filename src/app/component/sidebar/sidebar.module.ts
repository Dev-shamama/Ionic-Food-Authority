import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import {SidebarComponent} from "./sidebar.component"


const routes: Routes = [
  {
    path: '',
    component: SidebarComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SidebarComponent],
  exports: [
    SidebarComponent
  ]

})
export class SidebarPageModule {}