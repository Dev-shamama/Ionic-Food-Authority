import { Component } from '@angular/core';
import { ApiService } from 'api.service';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private apiService: ApiService,
    private route: Router,
    private loadingCtrl: LoadingController
  ) {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    loading.present();
  }

  async hideLoading() {
    await this.loadingCtrl.dismiss();
  }

  logout() {
    this.apiService.removeTokens();
    this.apiService.displayToast(
      'Logout successfully',
      'bottom',
      'toast-succes',
      'checkmark-circle-sharp',
      'success'
    );
    this.route.navigate(['/login']);
  }
}
