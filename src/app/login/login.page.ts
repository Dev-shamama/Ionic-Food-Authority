import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('userLogin')
  userLogin: NgForm | undefined;

  constructor() { }

  ngOnInit(): void {
    const s: any = document.getElementById('sidebar-main-container');
    // s.style.width = '0'
    s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
  }

  dataset = {
    cnic: '',
    password: '',
  }

  onSubmit() {
    console.log(this.dataset);
    // console.log(this.dataset.cnic.slice(0, 15));
  }

  cnicMasking(event: any): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    
    let formattedValue = value;
    
    // Mask the value based on length
    if (value.length > 5 && value.length <= 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5, 12)}`;
    } else if (value.length > 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12, 13)}`;
    }
    
    // Make sure to update the value only after the mask is applied
    const x: HTMLInputElement = document.getElementById('cnic') as HTMLInputElement;
    if (x.value !== formattedValue) {
      x.value = formattedValue;
    }
  }
}
