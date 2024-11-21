import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
import * as numberToWords from 'number-to-words';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-paychallan',
  templateUrl: './paychallan.page.html',
  styleUrls: ['./paychallan.page.scss'],
})
export class PaychallanPage {
  @ViewChild('payChallan')
  payChallan: NgForm | undefined;
  licenceId:any


  natureList: any[] = [];
  categoryList: any[] = [];
  districList: any[] = [];
  challanList: any[] = [];
  numberToWordsValue: any;

  applicantName = null;
  address = null;
  CNIC = null;
  Name_of_Food_Business = null;
  category = null;
  categoryName = null;
  district = null;
  districtName = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private urlParam: ActivatedRoute,
    public MainApp: AppComponent
  ) {
    this.licenceId = this.urlParam.snapshot.paramMap.get('id');

    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getAllLicenseChallan(e.access_token, this.licenceId)
          .then(async (res: any) => {
            console.log(res);
            if (res.reponse_type == 'success') {
              this.challanList = res.data.challan;

              for(let i of this.challanList){
                var total_amt = 0
                for (let x of i.challan){
                  total_amt +=  Number(x.Amount)

                }

                i.total_amount = total_amt
                i.in_word = numberToWords
                .toWords(total_amt)
                .toUpperCase();

              }
              
              this.numberToWordsValue = numberToWords
                .toWords(res.data.challan[0].challan[0].Amount)
                .toUpperCase();

              this.address = res.data.license[0].Address;
              this.applicantName = res.data.license[0].Name_of_Applicant;
              this.CNIC = res.data.license[0].CNIC;
              this.Name_of_Food_Business = res.data.license[0].Name_of_Food_Business;
              this.category = res.data.license[0].category;
              this.district = res.data.license[0].district;
              
              this.getNature();
              this.getCategory(this.category);
              this.getDistric(this.district);


            }else{
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
            }else {
              this.apiService.displayToast(
                res.data.msg,
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

  getCategory(_category: any) {
    this.apiService.getToken().then((e: any) => {
        this.apiService.getCategoryList(e.access_token).then(async (res: any) => {
            console.log(res);
            if (res.reponse_type == 'success') {
              res.data.map((item:any) => {
                if(this.category == item.id) {
                  this.categoryName = item.Category_Title

                }
              })
            }else {
              this.apiService.displayToast(
                res.data.msg,
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

  getDistric(_district: any) {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getDistricList(e.access_token)
          .then(async (res: any) => {
            console.log(res);
            
            if (res.reponse_type == 'success') {
              res.data.map((item:any) => {
                if(this.district == item.id) {
                  this.districtName = item.District_Name
                }
              })
            }else {
              this.apiService.displayToast(
                res.data.msg,
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

  /**
   * Opens the print dialog for the current page.
   */
  myFunc() {
    var divContents = document.getElementById('divContents')?.innerHTML;
    let printWindow: any = window.open('', '', 'height=800,width=1000');
    printWindow.document.write(`<html><head><title>Reports</title>
      <link rel="stylesheet" href="http://localhost:8100/assets/print.css">


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
    }, 3500);
  }
}
