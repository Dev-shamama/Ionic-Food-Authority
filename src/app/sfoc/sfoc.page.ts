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

  dashboardStatus: any = {
    approve: '',
    reject: '',
    get_expired: '',
  };

  constructor(public menuBar: MenuController, private apiService: ApiService , private MainApp : AppComponent) { }



  ngOnInit() {
    this.menuBar.close();

    this.FSOGetAllLicense();
    this.getDashboardDetails();
  }



  FSOGetAllLicense() {
    this.apiService.getToken().then((e: any) => {
      this.apiService.FSOGetAllLicenseAPI(e.access_token, { current_filted: this.licenseList.length })
        .then(async (res: any) => {
          if (res.reponse_type === 'success') {

            if (res.data.license.length == 0) {
              this.noMoreDataStatus = true
              console.log("Not More Data");
              return;
            }

            for(let i of res.data.license){
              console.log("i", i);
              for(let x of this.MainApp.status_list){
                if (x.id == i.Status) {
                  i.Status = i.Review != "Pass" ? i.Review : i.Expiry_Status != "Valid" ? i.Expiry_Status : x.Status_Name
                  
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
        this.FSOGetAllLicense();
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 1000);
    } else {
      return;
    }
  }
}
