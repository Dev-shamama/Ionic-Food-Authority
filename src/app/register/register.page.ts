import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('fullForm')
  fullForm: NgForm | undefined;

  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit(): void {
    const s: any = document.getElementById('sidebar-main-container');
    // s.style.width = '0'
    s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
  }

  dataset = {
    logo: '/assets/img/profile.png',
    name: '',
    cnic: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.dataset.logo = reader.result as string;
      };
      reader.readAsDataURL(file);

    }
  }

  onSubmitHalfForm() {
    console.log(this.dataset);

    // console.log(this.dataset.cnic.slice(0, 15));
  }


  onSubmitFullForm() {
    console.log(this.dataset)
    this.apiService.signup(this.dataset).then(async (res: any) => {
      if (res.reponse_type == "success") {
        this.route.navigate(['/profile'])
      }

    }).catch(async (err: any) => {
      console.log(err)

    })

    // console.log(this.dataset.cnic.slice(0, 15));
  }

  get passwordsMatch(): boolean {
    return this.dataset.password === this.dataset.confirmPassword;
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

  fileInput() {
    document.getElementById('logoFileInput')?.click();
  }

}
