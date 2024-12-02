import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('userLogin')
  userLogin: NgForm | undefined;

  constructor(
    private apiService: ApiService,
    private route: Router,
    public MainApp: AppComponent
  ) {}

  cardMask = this.MainApp.cardMask
  maskPredicate = this.MainApp.maskPredicate

  dataset = {
    username: '',
    password: '',
  };

  onSubmit() {
    console.log(this.dataset);

    // console.log(this.dataset.cnic.slice(0, 15));
    this.MainApp.showLoading();
    this.apiService
      .login(this.dataset)
      .then(async (res: any) => {
        this.MainApp.hideLoading();
        if (res.success.msg == 'Login Success') {
          this.route.navigate([`/sendotp/${res.success.uid}/login`]);
        } else {
          return;
        }
      })
      .catch(async (err: any) => {
        this.MainApp.hideLoading();
        return;
      });
  }

}
