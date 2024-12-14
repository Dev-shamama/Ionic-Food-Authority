import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  dataset: {
    applicant: any;
    cnic: any;
    phone: any;
    cell: any;
    foodBusiness: any;
    natureBusiness: any;
    category: any;
    district: any;
    secp: any;
    ntn: any;
    srb: any;
    salesTax: any;
    areaMeasurement: any;
    address: any;
  } = {
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
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    public MainApp: AppComponent,
    private urlParam: ActivatedRoute
  ) {
    this.districList = this.MainApp.districtList;
    this.natureList = this.MainApp.natureList;
  }

  cardMask = this.MainApp.cardMask;
  maskPredicate = this.MainApp.maskPredicate;

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
    this.MainApp.showLoading();
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
                this.dataset.salesTax =
                  res.data.license_fee[0].Total_License_Fee;
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
    let setAreaMeasurementListDummy = this.AreaMeasurementList.filter(
      (item: any) => item.id == id
    );
    this.dataset.srb = setAreaMeasurementListDummy[0].SRB;
    this.dataset.salesTax = setAreaMeasurementListDummy[0].Total_License_Fee;
  }

  getCategoryNature() {
    this.MainApp.showLoading();
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getCategoryNatureAPI(e.access_token, this.dataset.natureBusiness)
          .then(async (res: any) => {
            this.MainApp.hideLoading();
            console.log('res', res);
            if (res.reponse_type == 'success') {
              this.categoryList = res.data.category;
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
