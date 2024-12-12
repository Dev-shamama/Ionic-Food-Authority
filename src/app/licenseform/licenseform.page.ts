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
  AreaMeasurementList: any[] = [];

  natureBusinessName: any;
  categoryName: any;
  districtName: any;

  dataset: any = {
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
    // sureAnswer: 'Yes',
    // registrationName: null,
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    public MainApp: AppComponent
  ) {
    this.getNature();
    this.getCategory();
    this.getDistric();
    // this.autoSRB();
  }

  cardMask = this.MainApp.cardMask;
  maskPredicate = this.MainApp.maskPredicate;

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

  getCategoryArea() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getCategoryAreaAPI(e.access_token, this.dataset.category)
          .then(async (res: any) => {
            this.MainApp.hideLoading();
            if (res.reponse_type == 'success') {
              console.log('res', res);
              if (res.data.license_fee[0].licensefee.length > 0) {
                this.AreaMeasurementList = res.data.license_fee[0].licensefee;
                this.dataset.areaMeasurement = '';
                this.dataset.srb = '';
                this.dataset.salesTax = '';
              } else {
                let fromArea =
                  res.data.license_fee[0].Size_Covered_Area_SQ_FT_From;
                let toArea = res.data.license_fee[0].Size_Covered_Area_SQ_FT_TO;

                this.AreaMeasurementList = res.data.license_fee;
                this.dataset.areaMeasurement = `${fromArea} TO ${toArea}`;
                this.dataset.srb = res.data.license_fee[0].SRB;
                this.dataset.salesTax = res.data.license_fee[0].Total_License_Fee;
              }
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

  setSRBAndSalesTax(e: any) {
    let id = e.detail.value;
    let setAreaMeasurementListDummy = this.AreaMeasurementList.filter((item: any) =>item.id == id)
    this.dataset.srb = setAreaMeasurementListDummy[0].SRB;
    this.dataset.salesTax = setAreaMeasurementListDummy[0].Total_License_Fee;
  }


  getCategoryNature(id: any) {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getCategoryNatureAPI(e.access_token, id)
          .then(async (res: any) => {
            this.MainApp.hideLoading();
            if (res.reponse_type == 'success') {
              console.log('res', res);
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
