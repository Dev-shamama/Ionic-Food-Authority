import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { Platform } from '@ionic/angular';
import { ToastController, LoadingController } from '@ionic/angular';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import * as $ from 'jquery';
// import { Storage } from '@ionic/storage-angular';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // public domain = 'https://sfa.pythonanywhere.com';
  // localhost: string = 'https://sfa.pythonanywhere.com';
  public domain = 'https://sfa.pythonanywhere.com';
  localhost: string = 'https://sfa.pythonanywhere.com';
  
  previousUrl: string = '';
  plt: string;
  web_get_restricted = 0;
  web_post_restricted = 0;
  web_put_restricted = 0;
  web_delete_restricted = 0;

  android_get_restricted = 0;
  android_post_restricted = 0;
  android_put_restricted = 0;
  android_delete_restricted = 0;

  ios_get_restricted = 0;
  ios_post_restricted = 0;
  ios_put_restricted = 0;
  ios_delete_restricted = 0;

  success_model_is_open = false;

  constructor(
    private platform: Platform,
    public toastController: ToastController,
    private router: Router,
    // private storage: Storage,
    private _location: Location,
    private loadingCtrl: LoadingController
  ) {
    this.plt = this.platform.is('mobileweb')
      ? 'web'
      : this.platform.is('ios')
      ? 'ios'
      : 'android';
    // this.localhost = 'https://sfa.pythonanywhere.com'; // put your IP here
    this.localhost = 'https://sfa.pythonanywhere.com'; // put your IP here
    
    // this.initStorage()
  }


  getCookie(name: any) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Page Loading...',
      spinner: 'circles',
    });

    loading.present();
  }

  async removeLoading() {
    await this.loadingCtrl.dismiss();
  }

  async signup(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/signup/`, options)
        .then(async (response) => {
          const data = await response.json();

          if (data.reponse_type == 'success') {
            var access_token = data.token.access;
            var refrash_token = data.token.refresh;
            this.tempSaveTokens(access_token, refrash_token);

            resolve(data);
          } else {
            this.displayToast(
              data.msg,
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async checkUserId(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/check-uid/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async otpType(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/send-otp/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async TwoFvOtp(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/2fv-otp/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            var access_token = data.token.access;
            var refrash_token = data.token.refresh;
            this.saveTokens(access_token, refrash_token);
            this.tempRemoveTokens();
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async VerifyOtp(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/check-otp/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async resetPasswordAPI(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/reset-password/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  // async signup(credentials: any): Promise<any> {
  //   return new Promise<any>((resolve) => {
  //     const data = credentials;
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     };
  //     fetch(`${this.localhost}/signup/`, options)
  //       .then(async (response) => {
  //         const data = await response.json();
  //         console.log('API', data);
  //         if (data.reponse_type == 'success') {
  //           this.displayToast(
  //             data.msg,
  //             'bottom',
  //             'toast-succes',
  //             'checkmark-circle-sharp',
  //             'success'
  //           );
  //           var access_token = data.token.access;
  //           var refrash_token = data.token.refresh;
  //           this.saveTokens(access_token, refrash_token);

  //           resolve(data);
  //         } else {
  //           this.displayToast(
  //             data.msg,
  //             'bottom',
  //             'toast-error',
  //             'warning-outline',
  //             'danger'
  //           );
  //           resolve(data);
  //         }
  //       })
  //       .catch((e) => {
  //         resolve(e);
  //       });
  //   });
  // }

  async login(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/login/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.success) {
            var access_token = data.success.token.access;
            var refrash_token = data.success.token.refresh;
            this.tempSaveTokens(access_token, refrash_token);

            resolve(data);
          } else {
            this.displayToast(
              data.errors.non_field_errors[0],
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async AccessTokenvalid(access_token: any, refrash_token: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      fetch(`${this.localhost}/Tokenvalidcheck/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async RefrashTokenvalid(refrash_token: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = { RefrashToken: refrash_token };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/refrashToken/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            this.saveTokens(data.token.access, data.token.refresh);
          }
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async ChangePassword(
    data: any,
    access_token: any,
    refrash_token: any
  ): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/changepassword/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
            this.loadingCtrl.dismiss();
            this.displayToast(
              data.msg,
              'bottom',
              'toast-succes',
              'checkmark-circle-sharp',
              'success'
            );
          } else {
            if (data.msg == 'login_not') {
              this.loadingCtrl.dismiss();
              this.router.navigate(['/login']);
              this.displayToast(
                'Session Expaired Login Again',
                'bottom',
                'toast-error',
                'warning-outline',
                'danger'
              );
            } else {
              this.loadingCtrl.dismiss();
              if (data.msg) {
                this.displayToast(
                  data.msg,
                  'bottom',
                  'toast-error',
                  'warning-outline',
                  'danger'
                );
              }
            }
          }
        })
        .catch(async (e) => {
          this.loadingCtrl.dismiss();
          alert('Something went wrong');
          this.displayToast(
            e,
            'bottom',
            'toast-error',
            'warning-outline',
            'danger'
          );
        });
    });
  }

  async ForgetPassword(data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/forgot-password/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
            this.loadingCtrl.dismiss();
          } else {
            if (data.msg == 'login_not') {
              this.loadingCtrl.dismiss();
              this.displayToast(
                'Session Expaired Login Again',
                'bottom',
                'toast-error',
                'warning-outline',
                'danger'
              );
            } else {
              this.loadingCtrl.dismiss();
              if (data.msg) {
                this.displayToast(
                  data.msg,
                  'bottom',
                  'toast-error',
                  'warning-outline',
                  'danger'
                );
              }
            }
          }
        })
        .catch(async (e) => {
          this.loadingCtrl.dismiss();
          this.displayToast(
            e,
            'bottom',
            'toast-error',
            'warning-outline',
            'danger'
          );
        });
    });
  }

  // Dashboard API
  async getLicense(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-license/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }
  
  async getCategoryList(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-category/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type) {
            resolve(data);
          } else {
            this.displayToast(
              data.errors.non_field_errors[0],
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async getNatureList(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-nature/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type) {
            resolve(data);
          } else {
            this.displayToast(
              data.errors.non_field_errors[0],
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async getDistricList(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-distric/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type) {
            resolve(data);
          } else {
            this.displayToast(
              data.errors.non_field_errors[0],
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async getAutoSRB(access_token: string, data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/get-srb/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type) {
            resolve(data);
          } else {
            this.displayToast(
              data.errors.non_field_errors[0],
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async AddLicenseAPI(access_token: string, data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/add-license/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type) {
            resolve(data);
          } else {
            this.displayToast(
              data.errors.non_field_errors[0],
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async UpdateLicenseAPI(access_token: string, data: any, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/update-license/${id}/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type) {
            resolve(data);
          } else {
            this.displayToast(
              data.errors.non_field_errors[0],
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }



  async checkDocumentStatusAPI(access_token: string, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/check-document-status/${id}/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type) {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }
  

  async getAllLicenseChallan(access_token: string, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/License-challan/${id}/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type) {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async getChallanFees(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-license-fee/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type) {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async uploadLicenseDocument(access_token: string, data: any, id:any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/upload-license-attachment/${id}/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async getStatusAPI(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-status/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async getBankAPI(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-bank/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async getDashboardDetailsAPI(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/dashboard-details/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }
  
  async getProfileAPI(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-profile/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async profileUpdate(access_token: string, data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/update-profile/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async changePasswordAPI(access_token: string, data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/changepassword/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async getLicenseDetailsAPI(access_token: string, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      fetch(`${this.localhost}/get-license-details/${id}/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }


    async FSOGetAllLicenseAPI(access_token: string, data: any): Promise<any> {
      return new Promise<any>((resolve) => {
        const options = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        fetch(`${this.localhost}/fso-get-all-license/`, options)
          .then(async (response) => {
            const data = await response.json();
            resolve(data);
          })
          .catch((e) => {
            resolve(e);
          });
      });
    }

    async FSOSearchLicenseAPI(access_token: string, data: any): Promise<any> {
      return new Promise<any>((resolve) => {
        const options = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        fetch(`${this.localhost}/fso-search-license/`, options)
          .then(async (response) => {
            const data = await response.json();
            resolve(data);
          })
          .catch((e) => {
            resolve(e);
          });
      });
    }


    

    


  // token handel
  async saveTokens(access: string, refresh: string): Promise<void> {
    await SecureStoragePlugin.set({ key: 'access_token', value: access });
    await SecureStoragePlugin.set({ key: 'refresh_token', value: refresh });
  }

  async getToken(): Promise<Object> {
    const access_token = await SecureStoragePlugin.get({ key: 'access_token' });
    const refrash_token = await SecureStoragePlugin.get({
      key: 'refresh_token',
    });

    return {
      access_token: access_token.value,
      refrash_token: refrash_token.value,
    };
  }

  async removeTokens(): Promise<void> {
    await SecureStoragePlugin.remove({ key: 'access_token' });
    await SecureStoragePlugin.remove({ key: 'refrash_token' });
    // this.displayToast("Account Logout" , 'bottom' , 'toast-success' , 'checkmark-circle-sharp' , 'success')
    this.router.navigate(['/login']);
  }

  // Temp Token
  async tempSaveTokens(access: string, refresh: string): Promise<void> {
    await SecureStoragePlugin.set({ key: 'temp_access_token', value: access });
    await SecureStoragePlugin.set({
      key: 'temp_refresh_token',
      value: refresh,
    });
  }

  async tempGetToken(): Promise<Object> {
    const access_token = await SecureStoragePlugin.get({
      key: 'temp_access_token',
    });
    const refrash_token = await SecureStoragePlugin.get({
      key: 'temp_refresh_token',
    });

    return {
      temp_access_token: access_token.value,
      temp_refresh_token: refrash_token.value,
    };
  }

  async tempRemoveTokens(): Promise<void> {
    await SecureStoragePlugin.remove({ key: 'temp_access_token' });
    await SecureStoragePlugin.remove({ key: 'temp_refresh_token' });
  }

  displayToast(msg: any, pos: any, tclass: any, type: any, color: any) {
    // Stop multiple toasts
    try {
      this.toastController
        .dismiss()
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          console.log('Closed');
        });
    } catch (e) {}

    this.toastController
      .create({
        message: msg,
        position: pos,
        duration: 3000,
        cssClass: tclass,
        color: color,
        buttons: [
          {
            side: 'start',
            icon: type,
            handler: () => {
              console.log('');
            },
          },
          {
            side: 'end',
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('');
            },
          },
        ],
      })
      .then((toast) => {
        toast.present();
      });
  }
}
