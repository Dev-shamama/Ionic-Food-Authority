import { ViewChild, Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
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

  cnic: string[] = Array(15).fill('');
  @ViewChildren('inputRef') inputRefs!: QueryList<ElementRef<HTMLDivElement>>;

  @ViewChild('payChallan')
  payChallan: NgForm | undefined;
  licenceId: any
  renewStatus: any
  domain: any;
  natureList: any[] = [];
  categoryList: any[] = [];
  challanList: any[] = [];
  numberToWordsValue: any;

  particular = [
    {
      "Particulars":"License Fee",
      "Amount":"",
      "details":"",
    },
    {
      "Particulars":"Renewal Fee",
      "Amount":"",
      "details":"",
    },
    {
      "Particulars":"Penalty",
      "Amount":"",
      "details":"",
    },
    {
      "Particulars":"Laboratory Testing Fee",
      "Amount":"",
      "details":"",
    },
    {
      "Particulars":"Food Product Registration Fee",
      "Amount":"",
      "details":"",
    },
    {
      "Particulars":"Other",
      "Amount":"",
      "details":"Received Amount in cash P.O No",
    },
    {
      "Particulars":"Total Amount",
      "Amount":"",
      "details":"Cash Officer/Operation Manager",
    },

  ]

  applicantName = null;
  address = null;
  CNIC = null;
  Name_of_Food_Business = null;
  category = null;
  categoryName = null;
  district = null;
  districtName = null;
  renew: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private urlParam: ActivatedRoute,
    public MainApp: AppComponent
  ) {
    this.licenceId = this.urlParam.snapshot.paramMap.get('id');
    this.MainApp.getDistrict();
    this.MainApp.getCategory();
    this.domain = this.apiService.domain


    this.urlParam.queryParams.subscribe(params => {
      if (params['renew'] === 'true') {
        this.renew = true;
        console.log('Renew parameter is true');
      } else {
        this.renew = false;
        console.log('Renew parameter is false or not present');
      }
    });


    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getAllLicenseChallan(e.access_token, this.licenceId)
          .then(async (res: any) => {
            if (res.reponse_type == 'success') {
              this.challanList = res.data.challan;
              let districtList = this.MainApp.districtList;
              let categoryList = this.MainApp.categoryList;


              for (let [index, i] of this.challanList.entries()) {
                var total_amt = 0
                for (let x of i.challan) {
                  total_amt += Number(x.Amount)

                }
                this.prefetchCNIC(i.CNIC, i)
                i.district = districtList.find((d) => d.id == i.district)
                i.category = categoryList.find((d) => d.id == i.category)

                // i.table = i.challan.find((data:any) => data.id == index)

                i.total_amount = total_amt
                i.in_word = numberToWords
                  .toWords(total_amt)
                  .toUpperCase();
              }
              this.numberToWordsValue = numberToWords
                .toWords(res.data.challan[0].challan[0].Amount)
                .toUpperCase();

              console.log(this.challanList);
            } else {
              this.apiService.displayToast(
                res.msg,
                'bottom',
                'toast-error',
                'warning-outline',
                'danger'
              );
              this.router.navigate(['/home'])

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
  myFunc($event: any, id: any) {
    console.log(id)
    // var divContents = document.getElementById('divContents')?.innerHTML;
    var divContents = document.getElementById(id)?.innerHTML;

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
    }, 2000);
  }





  prefetchCNIC(cnicNumber: string, i: any): void {
    // console.log("id", id)
    // let respo = this.challanList.filter(i => {i.id == id})
    // console.log("respo")
    const apiResponse = cnicNumber; // CNIC from API

    if (apiResponse) {
      this.setFullCNIC(apiResponse.replace(/-/g, ''), i); // Remove dashes for processing

    } else {
      i.cnic = ['', '', '', '', '', '-', '', '', '', '', '', '', '', '-', '']
    }
  }

  setFullCNIC(newCNIC: string, i: any): void {
    console.log("i", i)

    if (/^\d{13}$/.test(newCNIC)) {
      // Ensure formatting before setting CNIC
      const formattedCNIC = [
        ...newCNIC.slice(0, 5), // First 5 digits
        '-', // Separator
        ...newCNIC.slice(5, 12), // Next 7 digits
        '-', // Separator
        ...newCNIC.slice(12), // Last digit
      ];

      if (formattedCNIC) {
        i.cnic = formattedCNIC;

      } else {
        i.cnic = ['', '', '', '', '', '-', '', '', '', '', '', '', '', '-', '']
      }

      // Check if inputRefs is initialized
      if (this.inputRefs && this.inputRefs.length > 0) {
        this.inputRefs.forEach((ref, index) => {
          if (ref.nativeElement) {
            ref.nativeElement.textContent = i.cnic[index];
          }
        });
      }
    }
  }

  onInput(event: any, index: number): void {
    const value = (event.target as HTMLDivElement).textContent || '';

    if (!/^\d?$/.test(value)) {
      (event.target as HTMLDivElement).textContent = this.cnic[index];
      return;
    }

    this.cnic[index] = value;

    // Move focus to the next editable field
    if (value && index < 14) {
      const nextInput = this.inputRefs.get(index + 1)?.nativeElement;
      nextInput?.focus();
    }
  }

  onKeyDown(index: number, event: KeyboardEvent): void {
    const currentContent = this.cnic[index];

    // Backspace navigation
    if (event.key === 'Backspace' && !currentContent && index > 0) {
      const previousInput = this.inputRefs.get(index - 1)?.nativeElement;
      previousInput?.focus();
    }
  }


  navigateOtherPage(id: any) {
    if (this.renew == true) {
      this.router.navigate([`/renewuploaddocument/${id}`], { queryParams: { renew: 'true' } });
    } else {
      this.router.navigate([`/uploaddocument/${id}`]);
    }
  }
}
