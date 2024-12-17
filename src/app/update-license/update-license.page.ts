import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-update-license',
  templateUrl: './update-license.page.html',
  styleUrls: ['./update-license.page.scss'],
})
export class UpdateLicensePage {
  formSubmitted = false;
  updateForm = false;
  id: any;
  statusCheck: any = '';
  expiredCheck: any = '';

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
    this.urlParam.queryParams.subscribe((params) => {
      if (params['update'] === 'true') {
        this.updateForm = true;
        this.id = params['id'];
        this.getLicenseDetails();
      } else {
        this.id = params['id'];
        this.getLicenseDetails();
        this.updateForm = false;
      }
    });

    this.districList = this.MainApp.districtList;
    this.natureList = this.MainApp.natureList;
  }

  getLicenseDetails() {
    // this.MainApp.showLoading();
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getLicenseDetailsAPI(e.access_token, this.id)
          .then(async (res: any) => {
            if (res.reponse_type === "success") {

              let isExpired = this.MainApp.checkExpiryDate(
                res.data[0].Expiry_date || ''
              );

              let statusList = this.MainApp.status_list;
              let checkStatus = statusList.find((i: any) => i.id == res.data[0].Status);

              if (this.updateForm === true) {
                if (
                  checkStatus.Status_Name !== "Pending" &&
                  checkStatus.Status_Name !== "Renew" &&
                  res.data[0].Review !== "Reject"
                ) {
                  this.router.navigate(['/home']);
                } else {
                  // Continue with the desired logic
                }
              } else if (this.updateForm === false) {
                if (isExpired.status !== 'Expired') {
                  this.router.navigate(['/home']);
                } else {
                  this.expiredCheck = isExpired.status
                }
              }

              this.MainApp.hideLoading();
                // Fetch status data
                this.statusCheck = statusList.filter((stat: any) => {
                  if (stat.id == res.data[0].Status) {
                    return stat.Status_Name;
                  }
                });

                this.dataset.cnic = res.data[0].CNIC;
                this.dataset.applicant = res.data[0].Name_of_Applicant;
                this.dataset.phone = res.data[0].Phone;
                this.dataset.cell = res.data[0].Cell;
                this.dataset.foodBusiness = res.data[0].Name_of_Food_Business;
                this.dataset.natureBusiness = res.data[0].Nature_of_Business;
                this.dataset.category = res.data[0].category;
                this.dataset.district = res.data[0].district;
                this.dataset.secp = res.data[0].SECP;
                this.dataset.ntn = res.data[0].NTN;
                this.dataset.srb = res.data[0].SRB;
                this.dataset.salesTax = res.data[0].SALES_TAX;
                this.dataset.areaMeasurement = res.data[0].Area_Measurement_SQ_FT;
                this.dataset.address = res.data[0].Address;

                this.getCategoryNature(true);
                this.getCategoryArea(true);

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
            this.MainApp.hideLoading();
            console.log(err);
          });
      })
      .catch((err: any) => {
        this.MainApp.hideLoading();
        return null
      });
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

    if (
      this.statusCheck[0].Status_Name == 'Pending' ||
      this.statusCheck[0].Status_Name == 'Reject' ||
      this.statusCheck[0].Status_Name == 'Renew'
    ) {
      // If Status (Reject) License Update
      this.apiService
        .getToken()
        .then((e: any) => {

          console.log({...this.dataset, id: Number(this.id)})
          this.apiService
            .changesUpdateLicenseAPI(
              e.access_token,
              { ...this.dataset, id: Number(this.id) },
              this.id
            )
            .then(async (res: any) => {
              this.MainApp.hideLoading();
              console.log(res);
              if (res.reponse_type == 'success') {
                this.apiService.displayToast(
                  res.msg,
                  'bottom',
                  'toast-succes',
                  'checkmark-circle-sharp',
                  'success'
                );
                this.router.navigate([`/paychallan/${res.data.License_Id}`], {
                  queryParams: { renew: 'true' },
                });
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
    } else if (this.expiredCheck == 'Expired') {
      // If Status (Expired) License Update -> Renew
      this.apiService
        .getToken()
        .then((e: any) => {
          this.apiService
            .UpdateLicenseAPI(e.access_token, this.dataset, this.id)
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
                this.router.navigate([`/paychallan/${res.data.License_Id}`], {
                  queryParams: { renew: 'true' },
                });
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

  getCategoryArea(start = false) {
    start == false ? this.MainApp.showLoading() : null;

    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getCategoryAreaAPI(e.access_token, this.dataset.category)
          .then(async (res: any) => {
            this.MainApp.hideLoading();

            if (res.reponse_type === 'success') {
              if (!start) {
                // Clear data only if it's not the first call
                this.dataset.areaMeasurement = '';
                this.dataset.srb = '';
                this.dataset.salesTax = '';
              }

              // Populate AreaMeasurementList
              this.AreaMeasurementList = res.data.license_fee[0].licensefee;
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

    console.log(id);
    let setAreaMeasurementListDummy = this.AreaMeasurementList.filter(
      (item: any) => item.id == id
    );
    this.dataset.srb = setAreaMeasurementListDummy[0].SRB;
    this.dataset.salesTax = setAreaMeasurementListDummy[0].Total_License_Fee;
  }

  getCategoryNature(start = false) {
    start == false ? this.MainApp.showLoading() : null;
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
