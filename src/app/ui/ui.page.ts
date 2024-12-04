import { ViewChild, Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.page.html',
  styleUrls: ['./ui.page.scss'],
})
export class UiPage implements AfterViewInit {
  cnic: string[] = Array(15).fill('');
  @ViewChildren('inputRef') inputRefs!: QueryList<ElementRef<HTMLDivElement>>;

  ngAfterViewInit(): void {
    // Example: Prefill CNIC with a sample value after the view is initialized
    this.prefetchCNIC();
  }


  @ViewChild('payChallan')
  payChallan: NgForm | undefined;
  licenceId: any
  renewStatus: any

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
  renew: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private urlParam: ActivatedRoute,
    public MainApp: AppComponent
  ) {
  }
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


  prefetchCNIC(): void {
    const apiResponse = '12345-1234567-1'; // CNIC from API
    this.setFullCNIC(apiResponse.replace(/-/g, '')); // Remove dashes for processing
  }

  setFullCNIC(newCNIC: string): void {
    if (/^\d{13}$/.test(newCNIC)) {
      // Ensure formatting before setting CNIC
      const formattedCNIC = [
        ...newCNIC.slice(0, 5), // First 5 digits
        '-', // Separator
        ...newCNIC.slice(5, 12), // Next 7 digits
        '-', // Separator
        ...newCNIC.slice(12), // Last digit
      ];

      this.cnic = formattedCNIC;

      // Check if inputRefs is initialized
      if (this.inputRefs && this.inputRefs.length > 0) {
        this.inputRefs.forEach((ref, index) => {
          if (ref.nativeElement) {
            ref.nativeElement.textContent = this.cnic[index];
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
}
