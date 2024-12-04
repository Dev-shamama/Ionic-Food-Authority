import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenewuploaddocumentPage } from './renewuploaddocument.page';

const routes: Routes = [
  {
    path: '',
    component: RenewuploaddocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenewuploaddocumentPageRoutingModule {}
