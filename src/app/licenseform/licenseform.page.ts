import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-licenseform',
  templateUrl: './licenseform.page.html',
  styleUrls: ['./licenseform.page.scss'],
})
export class LicenseformPage {
  formSubmitted = false;

  @ViewChild('licenseForm')
  licenseForm: NgForm | undefined;

  constructor(private router: Router) {}

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cancel(isOpen: boolean) {
  this.isModalOpen = isOpen;

  }


  dataset = {
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
    currentPayment: null,
    challanNo: null,
    amountPaid: null,
    datePayment: null,
  };

  onSubmit() {
    console.log(this.dataset);

    const review_model = document.getElementById('review-model');
    review_model?.classList.add('active');
  }

  FormOnSubmitted() {
    const checkStatus = this.formSubmitted;
    if (checkStatus) {
      this.router.navigate(['/paychallan']);
    }
  }

  cnicMasking(event: any): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
  
    let formattedValue = value;
  
    if (value.length > 5 && value.length <= 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5, 12)}`;
    } else if (value.length > 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12, 13)}`;
    }
  
    let x:any = document.getElementById('cnic')
    x.value = formattedValue;
  }
}
