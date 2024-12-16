import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
import { ReCaptchaV3Service } from 'ng-recaptcha';

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
    public MainApp: AppComponent,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  cardMask = this.MainApp.cardMask
  maskPredicate = this.MainApp.maskPredicate

  dataset = {
    username: '',
    password: '',
  };


  onSubmit(form: NgForm) {
    console.log(this.dataset);
    this.MainApp.showLoading();

    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      console.log(`Token [${token}] generated`);
      this.apiService
      .login({...this.dataset})
      // .login({...this.dataset, recaptcha: token})
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
    });
    // console.log(this.dataset.cnic.slice(0, 15));
   
  }

}
