import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  @ViewChild('resetPassword')
  resetPassword: NgForm | undefined;

  uid: any;
  otp: any;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private urlParam: ActivatedRoute,
    public MainApp: AppComponent,
  ) { }

  ngOnInit(): void {
    this.uid = this.urlParam.snapshot.paramMap.get('uid');
    this.otp = this.urlParam.snapshot.paramMap.get('otp');
    this.checkUserIdFunction();
  }

  dataset = {
    newPassword: '',
    confirmPassword: '',
  };

  checkUserIdFunction() {
    this.apiService
      .checkUserId({ uid: this.uid })
      .then(async (res: any) => {
        if (res.reponse_type == 'success') {
        } else {
          this.route.navigate(['/register']);
        }
      })
      .catch(async (err: any) => {
        this.route.navigate(['/register']);
      });
  }

  onSubmit() {
    this.MainApp.showLoading();
    const data = {
      uid: this.uid,
      otp_code: this.otp,
      password: this.dataset.newPassword,
      password2: this.dataset.confirmPassword,
    };
    this.apiService
      .resetPasswordAPI(data)
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
          this.route.navigate([`/login`]);
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



  get passwordsMatch(): boolean {
    return this.dataset.newPassword === this.dataset.confirmPassword;
  }
}
