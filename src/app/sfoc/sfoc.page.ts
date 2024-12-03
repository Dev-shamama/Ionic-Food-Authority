import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'api.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
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

  dashboardStatus: any = {
    approve: '',
    reject: '',
    get_expired: '',
  };

  constructor(public menuBar: MenuController, private apiService: ApiService) { }



  ngOnInit() {
    this.menuBar.close();

    this.FSOGetAllLicense();
    this.getDashboardDetails();
  }


  FSOGetAllLicense(page = 0) {
    console.log('page', page)
    this.apiService.getToken().then((e: any) => {
      this.apiService.FSOGetAllLicenseAPI(e.access_token, { current_filted: page })
        .then(async (res: any) => {
          console.log("response", res);
          if (res.reponse_type === 'success') {
            console.log(res.data.license.length)
            if (res.data.license.length == 0) {
              this.noMoreDataStatus = true
              console.log("Not More Data");
              return;
            } else {
              if (page > 0) {
                this.licenseList = this.licenseList.concat(res.data.license)
              } else {
                this.licenseList = res.data.license
              }

              // Fetch status data
              this.apiService.getStatusAPI(e.access_token).then(async (resf: any) => {

                if (resf.reponse_type === 'success') {
                  // Map through licenseList and match with resf.data based on Status
                  this.licenseList = this.licenseList.map((licenseItem: any) => {
                    const matchingStatus = resf.data.find((statusItem: any) => statusItem.id === licenseItem.Status);

                    // Append matched status information to licenseItem if a match is found
                    if (matchingStatus) {
                      return {
                        ...licenseItem,
                        Status: matchingStatus // Replace or extend as needed
                      };
                    }
                    return licenseItem;
                  });
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

  results: any;

  searchStatus: boolean = false;

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query)
    if (query == "") {
      this.results = [];
      this.searchStatus = false
    } else {
      this.results = this.licenseList.filter((d) => {
        console.log(d.License_ID.toLowerCase().indexOf(query) > -1)
        return d.License_ID.toLowerCase().indexOf(query) > -1
      });
      this.searchStatus = true
      console.log(this.results)
    }
  }


  onIonInfinite(ev: any) {
    if (this.noMoreDataStatus == false) {
      setTimeout(() => {
        this.FSOGetAllLicense(this.counter++);
        // this.FSOGetAllLicense();
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 1000);
    } else {
      return;
    }
  }
}
