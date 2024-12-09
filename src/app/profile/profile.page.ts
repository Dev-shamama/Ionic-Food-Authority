import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  @ViewChild('userProfile')
  userProfile: NgForm | undefined;

  @ViewChild('changePassword')
  changePassword: NgForm | undefined;

  domain = this.apiService.localhost;

  userProfileStatus = true;
  userProfileBtnStatus = true;

  captchaPassed: boolean = false;
  captchaResponse: string | undefined;

  profileDetail: any = {
    Profile_Picture: null,
  };

  profileLogo = '/assets/img/profile.png';
  profileDataset = {
    logo: '',
    name: null,
    email: null,
    phone: null,
  };
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileDataset.logo = reader.result as string;
        this.profileLogo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  fileInput() {
    if (this.userProfileStatus == false) {
      document.getElementById('logoFileInputProfile')?.click();
    }
  }

  constructor(
    public menuBar: MenuController,
    private apiService: ApiService,
    public MainApp: AppComponent,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.getProfile();
  }

  editClick() {
    this.userProfileStatus = false;
    this.userProfileBtnStatus = false;

    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      console.log(`Token [${token}] generated`);
    });
  }

  normalClick() {
    this.userProfileStatus = true;
    this.userProfileBtnStatus = true;
  }

  getProfile() {
    this.apiService.getToken().then((e: any) => {
      this.apiService
        .getProfileAPI(e.access_token)
        .then(async (res: any) => {
          console.log(res)
          if (res.reponse_type == 'success') {
            this.profileDetail = res.data[0];
            this.profileDataset.name = res.data[0].Name;
            this.profileDataset.email = res.data[0].Email;
            this.profileDataset.phone = res.data[0].Phone;
            this.profileLogo = this.domain + res.data[0].Profile_Picture;
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
          console.log(err);
        });
    });
  }

  onSubmitUserProfile() {
    this.MainApp.showLoading();
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .profileUpdate(e.access_token, this.profileDataset)
          .then(async (res: any) => {
            this.MainApp.hideLoading();
            if (res.reponse_type == 'success') {
              this.normalClick();
              this.apiService.displayToast(
                res.msg,
                'bottom',
                'toast-success',
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
            console.log(err);
            this.MainApp.hideLoading();
          });
      })
      .catch((err: any) => {
        console.error(err);
        this.MainApp.hideLoading();
      });
  }

  passwordDataset = {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  };

  onSubmitPassword() {
    this.MainApp.showLoading();
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .changePasswordAPI(e.access_token, {
            current_password: this.passwordDataset.currentPassword,
            password: this.passwordDataset.newPassword,
            password2: this.passwordDataset.confirmPassword,
          })
          .then(async (res: any) => {
            this.MainApp.hideLoading();
            if (res.reponse_type == 'success') {
              this.apiService.displayToast(
                res.msg,
                'bottom',
                'toast-success',
                'checkmark-circle-sharp',
                'success'
              );
              this.changePassword?.reset();
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
            console.log(err);this.MainApp.hideLoading();
          });
      })
      .catch((err: any) => {
        console.error(err);this.MainApp.hideLoading();
      });
  }

  get passwordsMatch(): boolean {
    return (
      this.passwordDataset.newPassword === this.passwordDataset.confirmPassword
    );
  }

}
