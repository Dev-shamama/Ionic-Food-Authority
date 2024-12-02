import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-licenseform',
  templateUrl: './licenseform.page.html',
  styleUrls: ['./licenseform.page.scss'],
})
export class LicenseformPage {
  formSubmitted = false;

  @ViewChild('licenseForm')
  licenseForm: NgForm | undefined;

  natureList: any[] = [];
  categoryList: any[] = [];
  districList: any[] = [];

  natureBusinessName:any;
  categoryName:any;
  districtName:any;

  dataset:any = {
    applicant: null,
    cnic: null,
    phone: null,
    cell: null,
    foodBusiness: null,
    natureBusiness: null,
    category: null,
    district: null,
    secp: null,
    ntn: null,
    srb: null,
    salesTax: null,
    areaMeasurement: null,
    address: null,
    sureAnswer: 'Yes',
    registrationName: null,
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    public MainApp: AppComponent
  ) {
    this.getNature();
    this.getCategory();
    this.getDistric();
    this.autoSRB();
  }

  cardMask = this.MainApp.cardMask
  maskPredicate = this.MainApp.maskPredicate


  getNature() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getNatureList(e.access_token)
          .then(async (res: any) => {
            console.log(res);
            if (res.reponse_type == 'success') {
              this.natureList = res.data;
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
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getCategoryList(e.access_token)
          .then(async (res: any) => {
            console.log(res);
            if (res.reponse_type == 'success') {
              this.categoryList = res.data;
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

  getDistric() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getDistricList(e.access_token)
          .then(async (res: any) => {
            console.log(res);
            if (res.reponse_type == 'success') {
              this.districList = res.data;
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

  autoSRB() {
    if (!this.dataset.natureBusiness || !this.dataset.areaMeasurement) {
      console.log('Input fields are empty. Skipping API call.');
      return;
    }
    let s = {
      nature_id: this.dataset.natureBusiness,
      areaMeasurement: this.dataset.areaMeasurement,
    };
    console.log(s);

    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getAutoSRB(e.access_token, {
            nature_id: this.dataset.natureBusiness,
            areaMeasurement: this.dataset.areaMeasurement,
          })
          .then((res: any) => {
  
            if (res.reponse_type === 'success') {
              this.dataset.srb = res.data.Srb_in_percent;
            }else{
              this.dataset.srb = null
              this.apiService.displayToast(
                res.msg,  
                'bottom', 
                'toast-error', 
                'close-circle-sharp', 
                'danger')
            }

          })
          .catch((err: any) => {
            console.error('Error fetching Auto SRB:', err);
          });
      })
      .catch((err: any) => {
        console.error('Error getting token:', err);
      });
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cancel(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onSubmit() {
    console.log(this.dataset);

    const review_model = document.getElementById('review-model');
    review_model?.classList.add('active');
  }

  FormOnSubmitted() {
    this.MainApp.showLoading();
    this.cancel(false);
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .AddLicenseAPI(e.access_token, this.dataset)
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
              this.router.navigate([`/paychallan/${res.data.License_Id}`]);
            }
          })
          .catch(async (err: any) => {
            this.MainApp.hideLoading();
            console.log(err);
          });
      })
      .catch((err: any) => {
        this.MainApp.hideLoading();
        console.error(err);
      });
  }

  
}
