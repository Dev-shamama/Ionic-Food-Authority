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


  getlicensestatus(id: any) {
    console.log("id", id)
     // Fetch status data
     this.apiService.getToken().then((e: any) => {
     this.apiService.getStatusAPI(e.access_token).then(async (resf: any) => {

      if (resf.reponse_type === 'success') {
        for(let i of resf.data) {
          if(i.id == id) {
            console.log("i.Status_Name", i.Status_Name)
           return i.Status_Name
          }
        }
        return null;
      } else{
        return null;
      }
    })
    .catch(async (err: any) => {
      return null;
    });
  });
  }

  checklogin(){
    this.apiService.getToken().then((res:any) => {

      if (res.access_token && res.refrash_token){

        this.auth = true
      }else{
        this.auth = false
      }

    }).catch((err:any) => {
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
    this.route.navigate(['/login']);
  }

  getProfile() {
    this.apiService.getToken().then((e: any) => {
      this.apiService
        .getProfileAPI(e.access_token)
        .then(async (res: any) => {
          if (res.reponse_type == 'success') {
            if(res.data[0].designation) {
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
}
