import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sendotp',
  templateUrl: './sendotp.page.html',
  styleUrls: ['./sendotp.page.scss'],
})
export class SendotpPage implements OnInit {
  @ViewChild('otpType')
  otpType: NgForm | undefined;
  uid: any;
  form: any;
  otp_type: any = 'email';
  cnic: any;

  userEmail: any;
  userNumber: any;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private urlParam: ActivatedRoute,
    public MainApp: AppComponent
  ) {}

  ngOnInit(): void {
    this.uid = this.urlParam.snapshot.paramMap.get('uid');
    this.form = this.urlParam.snapshot.paramMap.get('form');

    if (
      this.form !== 'signup' &&
      this.form !== 'forgetPassword' &&
      this.form !== 'login'
    ) {
      this.route.navigate(['/register']);
      return;
    }

    this.checkUserIdFunction();

    const s: any = document.getElementById('sidebar-main-container');
    // s.style.width = '0'
    s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
  }

  checkUserIdFunction() {
    this.apiService
      .checkUserId({ uid: this.uid })
      .then(async (res: any) => {
        console.log(res);

        if (res.reponse_type == 'success') {
          this.userEmail = res.data.email;
          this.userNumber = res.data.phone;
          this.cnic = res.data.username;
        } else {
          this.route.navigate(['/register']);
        }
      })
      .catch(async (err: any) => {
        this.route.navigate(['/register']);
      });
  }

  onSubmitFullForm() {
    this.MainApp.showLoading();

    if (this.form === 'signup' || this.form === 'login') {
      this.apiService
        .tempGetToken()
        .then((resp: any) => {
          if (resp.temp_access_token) {
            var temp_token: any = resp.temp_access_token;
          } else {
            var temp_token: any = '';
          }

          this.apiService
            .otpType({
              uid: this.uid,
              otp_type: this.otp_type,
              token: temp_token,
              reason: this.form,
            })
            .then(async (res: any) => {
              this.MainApp.hideLoading();

              if (res.reponse_type == 'success') {
                this.apiService.displayToast(
                  res.msg,
                  'bottom',
                  'toast-succes',
                  'checkmark-circle-sharp',
                  'success'
                );
                this.route.navigate([
                  '/verifyotp/' + this.uid + '/' + this.form,
                ]);
              } else {
                this.apiService.displayToast(
                  res.msg,
                  'bottom',
                  'toast-error',
                  'warning-outline',
                  'danger'
                );
              }
            })
            .catch(async (err: any) => {
              this.MainApp.hideLoading();
              console.log(err);
            });
        })
        .catch((err: any) => {
          this.MainApp.hideLoading();
          this.apiService.displayToast(
            'Invalid Token',
            'bottom',
            'toast-error',
            'warning-outline',
            'danger'
          );
        });
    }

    if (this.form === 'forgetPassword') {
      this.apiService
        .otpType({
          uid: this.uid,
          otp_type: this.otp_type,
          token: '',
          reason: this.form,
        })
        .then(async (res: any) => {
          this.MainApp.hideLoading();
          if (res.reponse_type == 'success') {
            this.apiService.displayToast(
              res.msg,
              'bottom',
              'toast-succes',
              'checkmark-circle-sharp',
              'success'
            );
            this.route.navigate(['/verifyotp/' + this.uid + '/' + this.form]);
          } else {
            this.apiService.displayToast(
              res.msg,
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
          }
        })
        .catch(async (err: any) => {
          this.MainApp.hideLoading();
          console.log(err);
        });
    }
  }
}
