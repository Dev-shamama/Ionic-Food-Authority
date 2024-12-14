import { Component } from '@angular/core';
import { ApiService } from 'api.service';
import { Router } from '@angular/router';
import { MaskitoOptions, MaskitoElementPredicate, maskitoTransform } from '@maskito/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  designation: any = false;
  status_list: any = []
  districtList: any[] = [];
  categoryList: any[] = [];
  natureList: any[] = [];

  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(5).fill(/\d/),
      '-',
      ...Array(7).fill(/\d/),
      '-',
      ...Array(1).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();


  auth = false;
  constructor(
    private apiService: ApiService,
    private route: Router,
    private loadingCtrl: LoadingController
  ) {

    this.checklogin();
    this.getProfile()
    this.getlicensestatus();
    this.getDistrict()
    this.getCategory();
    this.getNature()

  }




  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    loading.present();
  }

  async hideLoading() {
    await this.loadingCtrl.dismiss();
  }


  getlicensestatus() {
    // Fetch status data
    this.apiService.getToken().then((e: any) => {
      this.apiService.getStatusAPI(e.access_token).then(async (resf: any) => {
        if (resf.reponse_type === 'success') {
          this.status_list = resf.data
        } else {
          this.apiService.displayToast(
            resf.msg,
            'bottom',
            'toast-error',
            'warning-outline',
            'danger'
          );
        }
      })
        .catch(async (err: any) => {
          return null;
        });
    });
  }

  checklogin() {
    this.apiService.getToken().then((res: any) => {

      if (res.access_token && res.refrash_token) {

        this.auth = true
      } else {
        this.auth = false
      }

    }).catch((err: any) => {
      this.auth = false
    })
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
    window.location.href = '/login';
  }

  getProfile() {
    this.apiService.getToken().then((e: any) => {
      this.apiService
        .getProfileAPI(e.access_token)
        .then(async (res: any) => {
          if (res.reponse_type == 'success') {
            if (res.data[0].designation) {
              this.designation = res.data[0].designation || "";
            }
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

  getDistrict() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getDistricList(e.access_token)
          .then(async (res: any) => {
            if (res.reponse_type == 'success') {
              this.districtList = res.data
            } else {
              this.apiService.displayToast(
                res.data.msg,
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
      })
      .catch((err: any) => {
        console.error(err);
      });
  }


  getCategory() {
    this.apiService.getToken().then((e: any) => {
      this.apiService.getCategoryList(e.access_token).then(async (res: any) => {
        if (res.reponse_type == 'success') {
          this.categoryList = res.data


        } else {
          this.apiService.displayToast(
            res.data.msg,
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
    })
      .catch((err: any) => {
        console.error(err);
      });
  }

  getNature() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getNatureList(e.access_token)
          .then(async (res: any) => {
            if (res.reponse_type == 'success') {
              this.natureList = res.data;
            } else {
              this.apiService.displayToast(
                res.data.msg,
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
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  checkExpiryDate(date: any) {
    const refData = new Date(date); // Parse the input date (e.g., "2024-12-03")
    const today = new Date(); // Get the current date

    // Ensure today's date is at 00:00:00 for accurate comparison (ignore time portion)
    today.setHours(0, 0, 0, 0);

    // Check if the input date is before today's date (expired)
    if (refData < today) {
      // Return today's date in "YYYY-MM-DD" format if expired
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2-digit month
      const day = today.getDate().toString().padStart(2, '0'); // Ensure 2-digit day

      const formattedDate = `${year}-${month}-${day}`;

      return {
        status: "Expired",
        expiredDate: formattedDate, // Return today's date as expiry date
      };
    }

    // If the input date is on or after today's date, it's valid
    return {
      status: "Valid",
      validDate: date, // Return the input date as valid date
    };
  }

}
