import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenseviewPage } from './licenseview.page';

const routes: Routes = [
  {
    path: '',
    component: LicenseviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenseviewPageRoutingModule {}
