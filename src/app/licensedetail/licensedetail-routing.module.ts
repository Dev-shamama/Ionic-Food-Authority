import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicensedetailPage } from './licensedetail.page';

const routes: Routes = [
  {
    path: '',
    component: LicensedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicensedetailPageRoutingModule {}
