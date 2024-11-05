import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaychallanPage } from './paychallan.page';

const routes: Routes = [
  {
    path: '',
    component: PaychallanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaychallanPageRoutingModule {}
