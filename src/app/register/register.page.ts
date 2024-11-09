import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('halfForm')
  halfForm: NgForm | undefined;

  @ViewChild('fullForm')
  fullForm: NgForm | undefined;

  constructor() {}

  ngOnInit(): void {
    const s: any = document.getElementById('sidebar-main-container');
    // s.style.width = '0'
    s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
  }

  halfDataset = {
    cnic: '',
    email: '',
    phone: '',
  };

  formActiveDetail = true;

  onSubmitHalfForm() {
    console.log(this.halfDataset);
    this.formActiveDetail = false;

    // console.log(this.dataset.cnic.slice(0, 15));
  }

  fullDataset = {
    otp: '',
    password: '',
    confirmPassword: '',
  };

  onSubmitFullForm() {
    console.log(this.fullDataset);

    // console.log(this.dataset.cnic.slice(0, 15));
  }

  cnicMasking(event: any): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    let formattedValue = value;

    if (value.length > 5 && value.length <= 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5, 12)}`;
    } else if (value.length > 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(
        5,
        12
      )}-${value.slice(12, 13)}`;
    }

    let x: any = document.getElementById('cnic');
    x.value = formattedValue;
  }
}
