import { Component } from '@angular/core';
import { ApiService } from 'api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private apiService: ApiService, private route: Router) {}

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
