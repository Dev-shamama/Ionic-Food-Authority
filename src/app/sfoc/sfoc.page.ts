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

  dashboardStatus: any = {
    approve: '',
    reject: '',
    get_expired: '',
  };

  constructor(public menuBar: MenuController, private apiService: ApiService) {}



  ngOnInit() {
    this.menuBar.close();

    this.getLicense();
    this.getDashboardDetails();
  }

  
  getLicense() {
    this.apiService.getToken().then((e: any) => {
      this.apiService.getLicense(e.access_token)
        .then(async (res: any) => {
          console.log(res);
          
          if (res.reponse_type === 'success') {
            this.licenseList = res.data;
            
            // Fetch status data
            this.apiService.getStatusAPI(e.access_token).then(async (resf: any) => {
              console.log(resf);
              
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
                
                console.log(this.licenseList); // Updated licenseList with appended Status data
                
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

  public data = [
    'Amsterdam',
    'Buenos Aires',
    'Cairo',
    'Geneva',
    'Hong Kong',
    'Istanbul',
    'London',
    'Madrid',
    'New York',
    'Panama City',
  ];
  results: any;

  searchStatus: boolean = false;

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    console.log(query)
    if(query == "") {
      this.results = [];
      this.searchStatus = false
    }else {
      this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
      this.searchStatus = true
    }
  }


  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

}
