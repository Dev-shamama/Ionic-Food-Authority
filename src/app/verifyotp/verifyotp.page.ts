import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.page.html',
  styleUrls: ['./verifyotp.page.scss'],
})
export class VerifyotpPage implements OnInit {
  @ViewChild('otpType')
  verifyotp: NgForm | undefined;

  otp_code = '';
  uid: any;
  form: any;
  username: any;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private urlParam: ActivatedRoute,
    public MainApp: AppComponent
  ) {}

  ngOnInit(): void {
    this.form = this.urlParam.snapshot.paramMap.get('form');
    this.uid = this.urlParam.snapshot.paramMap.get('uid');

    if (this.form !== 'signup' && this.form !== 'forgetPassword' && this.form !== 'login') {
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
        this.MainApp.hideLoading();
        if (res.reponse_type == 'success') {
          if (this.form === 'signup' || this.form === 'login') {
            this.username = res.data.username;
          }
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
    let data = {};

    if (this.form == 'signup' || this.form == 'login') {
      this.apiService.tempGetToken().then((resp:any) => {
        if (resp.temp_access_token){
          var temp_token:any = resp.temp_access_token
        }else{
          var temp_token:any = ''
        }
      data = { username: this.username, otp_code: this.otp_code , token:temp_token ,  reason:this.form};
      this.apiService
        .TwoFvOtp(data)
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
            this.route.navigate(['/home']);
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
        
        }).catch((err:any) => {
          this.apiService.displayToast(
            "Invalid Token",
            'bottom',
            'toast-error',
            'warning-outline',
            'danger');
        })
    }


    if (this.form == 'forgetPassword') {

      this.apiService
        .VerifyOtp({ uid: this.uid, otp_code: this.otp_code})
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
              `/resetpassword/${this.uid}/${this.otp_code}`,
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
    }


  }
}
