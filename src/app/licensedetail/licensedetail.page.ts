import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { ApiService } from 'api.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-licensedetail',
  templateUrl: './licensedetail.page.html',
  styleUrls: ['./licensedetail.page.scss'],
})
export class LicensedetailPage {
  domain: any;
  documentUniqueName = '';

  activeCnic = '';
  fileNameCnic = '';

  activeChallan = '';
  activeDocuments = '';
  activePrevious = '';
  activeLab = '';
  activeMedical = '';

  fileObject: any = {
    cnic: null,
    challan: null,
    documents: null,
    previous: null,
    lab: null,
    medical: null,
  };

  id: any;

  licenseDetail: any = {
    Expiry_date: null,
    date: null,
    remainingAllDays: null,
    expiry_percentage: null,
    percentage: null,
    percentageString: null,
    past_days: null,
    past_days_percentage: null,
    upload_docs_no: null,

    License_ID: null,
    Address: null,
    district: null,
    Name_of_Applicant: null,
    CNIC: null,
    Name_of_Food_Business: null,
    Nature_of_Business: null,
    Expiry_date_view: null,
    Bar_code: null,
    QR_code: null
  };

  licenseDetailDocument: {
    cnic: any;
    document_of_property: any;
    Previous_Registration: any;
    Copy_of_Challan_form: any;
    Lab_testing_reports: any;
    Medical_reports: any;
  } = {
      cnic: null,
      document_of_property: null,
      Previous_Registration: null,
      Copy_of_Challan_form: null,
      Lab_testing_reports: null,
      Medical_reports: null,
    };


  statusCheck: any = '';

  constructor(
    private sanitizer: DomSanitizer,
    public menuBar: MenuController,
    private apiService: ApiService,
    public MainApp: AppComponent,
    private urlParam: ActivatedRoute
  ) {
    this.id = this.urlParam.snapshot.paramMap.get('id');
    this.domain = this.apiService.domain
    this.getLicenseDetails();
    this.checkDocumentStatus();
    this.MainApp.getDistrict()
    this.MainApp.getNature()
  }

  getLicenseDetails() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getLicenseDetailsAPI(e.access_token, this.id)
          .then(async (res: any) => {
            if (res.reponse_type == 'success') {
              // Fetch status data
              this.apiService
                .getStatusAPI(e.access_token)
                .then(async (resf: any) => {
                  if (res.reponse_type == 'success') {
                    resf.data.map((stat: any) => {
                      if (stat.id == res.data[0].Status) {
                        this.statusCheck = stat.Status_Name;
                      }
                    });
                  }
                })
                .catch(async (err: any) => {
                  console.log(err);
                });

              let asdad = res.data[0].date.slice(0, 10);
              const ref = new Date(asdad);
              const currentDate = new Date();
              const endDate = new Date(res.data[0].Expiry_date);

              console.log(res.data[0].Expiry_date)

              if (res.data[0].Expiry_date == null) {
                this.licenseDetail.Expiry_date = null;
              }else{
    
                  this.licenseDetail.Expiry_date = this.convertDate(
                    res.data[0].Expiry_date
                  );

              }

              const s: number = endDate.getTime() - currentDate.getTime();

              // Check if the expiry date has passed
              if (s <= 0) {
                this.licenseDetail.remainingAllDays = 0; // If the expiry date has passed, set remaining days to 0
              } else {
                this.licenseDetail.remainingAllDays = Math.floor(
                  s / (1000 * 60 * 60 * 24)
                ); // Otherwise, calculate remaining days
              }

              const decimalValue = this.calculateElapsedPercentage(
                ref,
                endDate,
                currentDate
              );

              this.licenseDetail.License_ID = res.data[0].License_ID
              this.licenseDetail.expiry_percentage = decimalValue.toFixed(2);
              this.licenseDetail.Address = res.data[0].Address
              this.licenseDetail.Name_of_Applicant = res.data[0].Name_of_Applicant
              this.licenseDetail.CNIC = res.data[0].CNIC
              this.licenseDetail.Name_of_Food_Business = res.data[0].Name_of_Food_Business
              this.licenseDetail.Nature_of_Business = res.data[0].Nature_of_Business
              this.licenseDetail.date = res.data[0].date.slice(0, 10)
              this.licenseDetail.Expiry_date_view = res.data[0].Expiry_date
              this.licenseDetail.Bar_code = res.data[0].Bar_code
              this.licenseDetail.QR_code = res.data[0].QR_code
              this.licenseDetail.district = res.data[0].district

              let districtList = this.MainApp.districtList;
              let natureList = this.MainApp.natureList;

              this.licenseDetail.district = districtList.find((d) => d.id == this.licenseDetail.district)
              this.licenseDetail.Nature_of_Business = natureList.find((d) => d.id == this.licenseDetail.Nature_of_Business)

              console.log(this.licenseDetail)


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
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  checkDocumentStatus() {
    this.apiService.getToken().then((e: any) => {
      this.apiService.checkDocumentStatusAPI(e.access_token, this.id)
        .then(async (res: any) => {
          console.log("document res", res);
          if (res.reponse_type === 'success') {
            this.licenseDetailDocument.Copy_of_Challan_form = res.data.documents.Copy_of_Challan_form;
            this.licenseDetailDocument.document_of_property = res.data.documents.Documents_of_property_or_tenancy;
            this.licenseDetailDocument.Lab_testing_reports = res.data.documents.Lab_testing_reports;
            this.licenseDetailDocument.Medical_reports = res.data.documents.Medical_reports;
            this.licenseDetailDocument.Previous_Registration = res.data.documents.Previous_Registration_Certificate;
            this.licenseDetailDocument.cnic = res.data.documents.Upload_Copy_of_CNIC;

            this.licenseDetail.past_days = 14 - res.data.past_days;
            this.licenseDetail.past_days_percentage = this.licenseDetail.past_days * 100 / 14;

            this.licenseDetail.upload_docs_no = res.data.upload_docs_no;
            let progressBar = document.querySelector('#progressBar')
            progressBar?.setAttribute('aria-valuenow', Math.round(Number(res.data.percentage)).toString());
            progressBar?.setAttribute('style', `--value: ${Math.round(Number(res.data.percentage)).toString()}`);

            console.log(this.licenseDetailDocument)
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

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    const documentUniqueName = this.documentUniqueName;
    if (input && input.files) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (documentUniqueName === 'cnic') {
            this.activeCnic = 'active';
            this.fileObject.cnic = reader.result;
          }

          if (documentUniqueName === 'challan') {
            this.activeChallan = 'active';
            this.fileObject.challan = reader.result;
          }

          if (documentUniqueName === 'documents') {
            this.activeDocuments = 'active';
            this.fileObject.documents = reader.result;
          }

          if (documentUniqueName === 'previous') {
            this.activePrevious = 'active';
            this.fileObject.previous = reader.result;
          }

          if (documentUniqueName === 'lab') {
            this.activeLab = 'active';
            this.fileObject.lab = reader.result;
          }


          if (documentUniqueName === 'medical') {
            this.activeMedical = 'active';
            this.fileObject.medical = reader.result;
          }

          this.closeModel();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  uploadDocument() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .uploadLicenseDocument(
            e.access_token,
            {
              cnic: this.fileObject.cnic,
              document_of_property: this.fileObject.documents,
              Previous_Registration: this.fileObject.previous,
              Copy_of_Challan_form: this.fileObject.challan,
              Lab_testing_reports: this.fileObject.lab,
              Medical_reports: this.fileObject.medical,
            },
            this.id
          )
          .then(async (res: any) => {
            this.MainApp.hideLoading();
            if (res.reponse_type == 'success') {
              this.apiService.displayToast(res.msg, 'bottom', 'toast-success', 'checkmark-circle-sharp', 'success')
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
        console.error(err);
      });
  }

  openModel(event: any, modaltype: any) {
    if (this.statusCheck == 'In Process' || this.statusCheck == 'Renew') {
      document.getElementById('model-container')?.classList.add('active');
      this.documentUniqueName = modaltype;
    } else {
      this.apiService.displayToast('Your document is already uploaded', 'bottom', 'toast-error', 'warning-outline', 'danger');
      console.log('data-pop value:', modaltype);
    }

  }

  closeModel() {
    document.getElementById('model-container')?.classList.remove('active');
  }

  myFunc() {
    var divContents = document.getElementById('divContents')?.innerHTML;
    let printWindow: any = window.open('', '', 'height=800,width=1000');
    printWindow.document.write(`<html><head><title>Reports</title>
      <link rel="stylesheet" href="http://localhost:8100/assets/licenseView.css">
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      
      * {
          font-family: "Poppins", serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }
      body{
          background:white;
      }
      </style>
      `);
    printWindow.document.write('</head><body>');

    printWindow.document.write(divContents);

    printWindow.document.write('</body></html>');

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 2000);
  }

  convertDate(dateString: any) {
    const date = new Date(dateString);

    const day = date.getDate();
    const year = date.getFullYear();

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const month = monthNames[date.getMonth()]; // Get month name

    return `${day}, ${month}, ${year}`;
  }

  calculateElapsedPercentage(startDate: any, endDate: any, currentDate: any) {
    // Check if the expiry date has already passed
    if (currentDate >= endDate) {
      return 100; // Return 100% if the expiry date has passed
    }

    // Total duration from startDate to endDate
    const totalDuration = endDate.getTime() - startDate.getTime();

    // Elapsed time from startDate to currentDate
    const elapsedTime = currentDate.getTime() - startDate.getTime();

    // Calculate percentage elapsed (how much of the total duration has passed)
    const elapsedPercentage = (elapsedTime / totalDuration) * 100;

    return elapsedPercentage;
  }
}
