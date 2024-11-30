import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SfocPage } from './sfoc.page';

const routes: Routes = [
  {
    path: '',
    component: SfocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SfocPageRoutingModule {}
