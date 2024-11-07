import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendotpPage } from './sendotp.page';

const routes: Routes = [
  {
    path: '',
    component: SendotpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendotpPageRoutingModule {}
