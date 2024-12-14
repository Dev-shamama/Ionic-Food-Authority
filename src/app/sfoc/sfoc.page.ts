import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'api.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-sfoc',
  templateUrl: './sfoc.page.html',
  styleUrls: ['./sfoc.page.scss'],
})
export class SfocPage implements OnInit {
  licenseList: any[] = [];
  statusList: any[] = [];
  counter: number = 1;
  noMoreDataStatus: boolean = false
  domain: any;

  dashboardStatus: any = {
    approve: '',
    reject: '',
    get_expired: '',
  };

  constructor(public menuBar: MenuController, private apiService: ApiService, private MainApp: AppComponent) { }

  ngOnInit() {
    this.menuBar.close();
    this.domain = this.apiService.domain
    this.FSOGetAllLicense();

    this.getDashboardDetails();
  }

  FSOGetAllLicense() {
    this.apiService.getToken().then((e: any) => {
      this.apiService.FSOGetAllLicenseAPI(e.access_token, { current_filted: this.licenseList.length })
        .then(async (res: any) => {
          if (res.reponse_type === 'success') {
            this.noMoreDataStatus = false
            if (res.data.license.length == 0) {
              this.noMoreDataStatus = true
              return;
            } else {
              this.noMoreDataStatus = false
            }

            for (let i of res.data.license) {

              let isExpired = this.MainApp.checkExpiryDate(i.Expiry_date)

              if (isExpired.status == "Expired") {
                i.Expiry_date = isExpired.status
              } else {
                i.Expiry_date = i.Expiry_date
              }

              let districtList = this.MainApp.districtList;
              console.log("districtList", districtList)
              i.district = districtList.find((d) => d.id == i.district)



              for (let x of this.MainApp.status_list) {
                if (x.id == i.Status) {
                  i.Status = i.Review != "Pass" ? i.Review : x.Status_Name
                }
              }

              this.licenseList.push(i)
            }
            console.log("response", this.licenseList);
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

  getDashboardDetails() {
    this.apiService.getToken().then((e: any) => {
      this.apiService
        .getDashboardDetailsAPI(e.access_token)
        .then(async (res: any) => {
          if (res.reponse_type == 'success') {
            this.dashboardStatus = res.data;
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

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  searchStatus: boolean = false;
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query)
    if (query == "") {
      this.searchStatus = false
      this.licenseList = []
      this.FSOGetAllLicense()
    } else {

      this.apiService.getToken().then((e: any) => {
        this.apiService.FSOSearchLicenseAPI(e.access_token, { query: query })
          .then(async (res: any) => {
            if (res.reponse_type === 'success') {
              this.noMoreDataStatus = true
              if (res.data.license.length == 0) {
                this.licenseList = []
                if (this.licenseList.length == 0) {
                  this.noMoreDataStatus = false
                } else {
                  this.noMoreDataStatus = true
                }
                return;
              }

              for (let i of res.data.license) {

                let isExpired = this.MainApp.checkExpiryDate(i.Expiry_date)

                if (isExpired.status == "Expired") {
                  i.Expiry_date = isExpired.status
                } else {
                  i.Expiry_date = i.Expiry_date
                }

                let districtList = this.MainApp.districtList;
                console.log("districtList", districtList)
                i.district = districtList.find((d) => d.id == i.district)



                for (let x of this.MainApp.status_list) {
                  if (x.id == i.Status) {
                    i.Status = i.Review != "Pass" ? i.Review : x.Status_Name

                  }
                }


                this.licenseList = []
                this.licenseList.push(i)
              }
              console.log("response", this.licenseList);
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
      this.searchStatus = true
    }
  }


  onIonInfinite(ev: any) {
    if (this.noMoreDataStatus == false) {
      setTimeout(() => {
        this.FSOGetAllLicense();
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 1000);
    } else {
      return;
    }
  }
}
