import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenseformPage } from './licenseform.page';

const routes: Routes = [
  {
    path: '',
    component: LicenseformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenseformPageRoutingModule {}
