import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-licenseview',
  templateUrl: './licenseview.page.html',
  styleUrls: ['./licenseview.page.scss'],
})
export class LicenseviewPage {
  frontEndDomain = this.apiService.frontEndDomain;

  image = 'http://localhost:8100/assets/img/certificate.png';
  id: any;
  statusCheck: any = '';
  domain: any;

  licenseDetail: any = {
    License_ID: null,
    Address: null,
    district: '',
    Name_of_Applicant: null,
    CNIC: null,
    Name_of_Food_Business: null,
    Nature_of_Business: null,
    Expiry_date_view: null,
    Bar_code: null,
    QR_code: null

  };

  constructor(
    public menuBar: MenuController,
    private apiService: ApiService,
    public MainApp: AppComponent,
    private urlParam: ActivatedRoute,
    public route: Router,
  ) {
    this.id = this.urlParam.snapshot.paramMap.get('id');
    this.domain = this.apiService.domain;
    this.getLicenseDetails();
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
            console.log(res);
            if (res.reponse_type == 'success') {
              // Fetch status data
              this.apiService
                .getStatusAPI(e.access_token)
                .then(async (resf: any) => {
                  if (res.reponse_type == 'success') {
                    resf.data.map((stat: any) => {
                      if (stat.id == res.data[0].Status) {
                        if (stat.Status_Name != 'Finalization' || stat.Status_Name != 'Delivered') {
                          this.statusCheck = stat.Status_Name
                        } else {
                          this.route.navigate(['/home']);
                        }
                      }
                    });
                  }
                })
                .catch(async (err: any) => {
                  console.log(err);
                });

              this.licenseDetail.License_ID = res.data[0].License_ID
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
}
