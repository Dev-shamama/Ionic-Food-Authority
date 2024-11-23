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
  documentUniqueName = '';

  activeCnic = '';
  fileNameCnic = '';

  activeChallan = '';
  activeDocuments = '';
  activePrevious = '';
  activeLab = '';

  fileObject: any = {
    cnic: null,
    challan: null,
    documents: null,
    previous: null,
    lab: null,
  };

  image: string;
  id: any;

  licenseDetail: any = {
    Expiry_date: null,
    date: null,
    remaingAllDays: null,
    expiry_percentage: null
  };

  constructor(
    private sanitizer: DomSanitizer,
    public menuBar: MenuController,
    private apiService: ApiService,
    public MainApp: AppComponent,
    private urlParam: ActivatedRoute
  ) {
    this.image = 'http://localhost:8100/assets/img/certificate.png';
    this.id = this.urlParam.snapshot.paramMap.get('id');

    this.getLicenseDetails();
  }

  getLicenseDetails() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getLicenseDetailsAPI(e.access_token, this.id)
          .then(async (res: any) => {
            console.log(res);
            if (res.reponse_type == 'success') {
              let asdad = res.data[0].date.slice(0, 10);
              const startDate = new Date(asdad);
              const endDate = new Date(res.data[0].Expiry_date);

              this.licenseDetail.Expiry_date = this.convertDate(
                res.data[0].Expiry_date
              );
              const s: number = endDate.getTime() - startDate.getTime();
              this.licenseDetail.remaingAllDays = Math.floor(
                s / (1000 * 60 * 60 * 24)
              );
              const decimalValue = this.calculateProgress(startDate, endDate);
              const percentage = decimalValue * 100;

              this.licenseDetail.expiry_percentage = percentage.toFixed(0);

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

          console.log(this.fileObject);

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
            // Medical_reports: this.,
          },
          this.id
        )
        .then(async (res: any) => {
          this.MainApp.hideLoading();
          if (res.reponse_type == "success") {
      
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
    console.log('data-pop value:', modaltype);
    document.getElementById('model-container')?.classList.add('active');

    this.documentUniqueName = modaltype;
  }

  closeModel() {
    document.getElementById('model-container')?.classList.remove('active');
  }

  myFunc() {
    var divContents = document.getElementById('divContents')?.innerHTML;
    let printWindow: any = window.open('', '', 'height=800,width=1000');
    printWindow.document.write(`<html><head><title>Reports</title>
      <link rel="stylesheet" href="assets/licenseView.css">
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

  calculateProgress(startDate: any, endDate: any) {
    const currentDate = new Date();

    // Calculate the total duration (in milliseconds)
    const totalTime = endDate.getTime() - startDate.getTime();

    // Calculate the time elapsed from the start date to the current date
    const elapsedTime = currentDate.getTime() - startDate.getTime();

    // Calculate the percentage of progress (time elapsed / total time)
    const progress = elapsedTime / totalTime;

    // Return the progress as a percentage, bounded between 0 and 100
    return Math.min(Math.max(progress * 100, 0), 100); // Multiply by 100 to get the percentage
  }
}
