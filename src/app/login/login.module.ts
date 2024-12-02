import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { HeaderPageModule } from '../component/header/header.module';
import { SidebarPageModule } from '../component/sidebar/sidebar.module';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HeaderPageModule,
    SidebarPageModule,
    MaskitoDirective
  ],
  declarations: [LoginPage],

})
export class LoginPageModule {}
