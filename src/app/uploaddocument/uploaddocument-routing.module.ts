import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploaddocumentPage } from './uploaddocument.page';

const routes: Routes = [
  {
    path: '',
    component: UploaddocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploaddocumentPageRoutingModule {}
