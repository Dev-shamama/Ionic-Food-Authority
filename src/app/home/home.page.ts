import { ApiService } from 'api.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  licenseList: any[] = [];
  statusList: any[] = [];
  domain: any;

  dashboardStatus: any = {
    approve: '',
    reject: '',
    get_expired: '',
  };

  constructor(public menuBar: MenuController, private apiService: ApiService, public MainApp: AppComponent) { }

  ngOnInit() {
    this.menuBar.close();
    this.MainApp.getDistrict()
    this.getLicense();
    this.getDashboardDetails();
    this.domain = this.apiService.domain
  }

  getLicense() {
    this.apiService.getToken().then((e: any) => {
      this.apiService.getLicense(e.access_token)
        .then(async (res: any) => {


          if (res.reponse_type === 'success') {
            this.licenseList = res.data;

            // Fetch status data
            this.apiService.getStatusAPI(e.access_token).then(async (resf: any) => {
              if (resf.reponse_type === 'success') {
                // Map through licenseList and match with resf.data based on Status
                this.licenseList = this.licenseList.map((licenseItem: any) => {

                  let isExpired = this.MainApp.checkExpiryDate(licenseItem.Expiry_date || '')	
                  let districtList = this.MainApp.districtList;

                  licenseItem.district = districtList.find((d) => d.id == licenseItem.district)

                  const matchingStatus = resf.data.find((statusItem: any) => statusItem.id === licenseItem.Status);
                  
                  // Append matched status information to licenseItem if a match is found
                  if (matchingStatus) {
                    return {
                      ...licenseItem,
                      Status: licenseItem.Review != "Pass" ? licenseItem.Review : matchingStatus.Status_Name,// Replace or extend as needed
                      Expiry_date: isExpired.status == "Expired" ? isExpired.status : licenseItem.Expiry_date
                    };

                  }
                  return licenseItem;
                });

                console.log("licenseList", this.licenseList); // Updated licenseList with appended Status data

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
                console.log(err);
              });

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
          console.log(res);
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
}
