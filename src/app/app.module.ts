import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarPageModule } from './component/sidebar/sidebar.module';

import { MaskitoDirective } from '@maskito/angular';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,  RecaptchaV3Module, IonicModule.forRoot(), AppRoutingModule, SidebarPageModule , MaskitoDirective],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: RECAPTCHA_V3_SITE_KEY,useValue: '6LeinpYqAAAAABZKiw_Oe_pW0hwnPVisKMEQ5cN-'}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
