import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.page.html',
  styleUrls: ['./verifyotp.page.scss'],
})
export class VerifyotpPage implements OnInit, OnDestroy  {
  @ViewChild('otpType')
  verifyotp: NgForm | undefined;

  otp_code = '';
  uid: any;
  form: any;
  username: any;


  otpDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
  countdownDisplay: string = '';
  buttonLabel: string = 'Resend OTP';
  countdownInterval: any;
  endTime: number = 0;


  constructor(
    private apiService: ApiService,
    private route: Router,
    private urlParam: ActivatedRoute,
    public MainApp: AppComponent
  ) {}
  ngOnInit(): void {

    this.startCountdown();
    this.form = this.urlParam.snapshot.paramMap.get('form');
    this.uid = this.urlParam.snapshot.paramMap.get('uid');

    if (this.form !== 'signup' && this.form !== 'forgetPassword' && this.form !== 'login') {
      this.route.navigate(['/register']);
      return;
    }

    this.checkUserIdFunction();

    // const s: any = document.getElementById('sidebar-main-container');
    // // s.style.width = '0'
    // s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
  }
  
  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    clearInterval(this.countdownInterval);
  }

  startCountdown() {
    // Set the end time for the countdown
    this.endTime = Date.now() + this.otpDuration;

    // Update button label
    this.buttonLabel = 'Resend OTP';

    // Clear any existing interval
    clearInterval(this.countdownInterval);

    // Update the countdown every second
    this.countdownInterval = setInterval(() => {
      const remainingTime = this.endTime - Date.now();

      if (remainingTime <= 0) {
        clearInterval(this.countdownInterval);
        this.countdownDisplay = 'OTP expired';
      } else {
        const minutes = Math.floor(remainingTime / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        this.countdownDisplay = `Expire in  ${minutes}m ${seconds}s`;
      }
    }, 1000);
  }

  resetCountdown() {
     // Restart the countdown timer

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
          otp_type: 'email',
          token: temp_token,
          reason: this.form,
        })
        .then(async (res: any) => {
          
          this.MainApp.hideLoading();

          if (res.reponse_type == 'success') {
            this.startCountdown();
            this.apiService.displayToast(
              res.msg,
              'bottom',
              'toast-succes',
              'checkmark-circle-sharp',
              'success'
            );
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
                    
            const s: any = document.getElementById('sidebar-main-container');
            // s.style.width = '0'
            s.setAttribute('style', '--side-min-width: 350px; --side-max-width: 350px');
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
