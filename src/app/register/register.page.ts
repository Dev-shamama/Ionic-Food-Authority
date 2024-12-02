import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {
  @ViewChild('fullForm')
  fullForm: NgForm | undefined;
  uid: any;
  constructor(private apiService: ApiService, private route: Router, public MainApp: AppComponent) {}
  
  cardMask = this.MainApp.cardMask
  maskPredicate = this.MainApp.maskPredicate

  profileLogo = '/assets/img/profile.png'

  dataset = {
    logo: '',
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
        this.profileLogo = reader.result as string;
        
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmitFullForm() {
    this.MainApp.showLoading();
    this.apiService
      .signup(this.dataset)
      .then(async (res: any) => {
        this.MainApp.hideLoading();

        if (res.reponse_type == 'success') {
          this.route.navigate(['/sendotp/'+res.uid+'/signup'])
        } 
      })
      .catch(async (err: any) => {
        this.MainApp.hideLoading();
        console.log(err);
      });

  }

  get passwordsMatch(): boolean {
    return this.dataset.password === this.dataset.confirmPassword;
  }


  fileInput() {
    document.getElementById('logoFileInput')?.click();
  }
}
