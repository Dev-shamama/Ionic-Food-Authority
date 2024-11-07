import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'; 
@Component({
  selector: 'app-licenseform',
  templateUrl: './licenseform.page.html',
  styleUrls: ['./licenseform.page.scss'],
})
export class LicenseformPage{
  @ViewChild('licenseForm') 
  licenseForm: NgForm | undefined;




  constructor() {
    this.f()


 
   }


  dataset = {
    applicant: null,
  }

  onSubmit() { 
    alert("Hello "  + JSON.stringify(this.dataset));
  }

  f() {
    console.log(this.dataset)
  }

}
