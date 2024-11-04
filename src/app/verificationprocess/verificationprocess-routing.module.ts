import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationprocessPage } from './verificationprocess.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationprocessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationprocessPageRoutingModule {}
