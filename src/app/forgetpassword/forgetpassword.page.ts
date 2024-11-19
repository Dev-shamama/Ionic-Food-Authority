import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  @ViewChild('forgetPassword')
  forgetPassword: NgForm | undefined;

  constructor(private apiService: ApiService, private route: Router, public MainApp: AppComponent) {}

  ngOnInit(): void {
    const s: any = document.getElementById('sidebar-main-container');
    // s.style.width = '0'
    s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
  }

  dataset = {
    cnic: '',
  };

  onSubmit() {
    // console.log(this.dataset.cnic.slice(0, 15));
    this.MainApp.showLoading();

    this.apiService
      .ForgetPassword({ username: this.dataset.cnic })
      .then(async (res: any) => {
        this.MainApp.hideLoading();
        if (res.reponse_type == 'success') {
            this.route.navigate(['/sendotp/'+res.data.uid+'/forgetPassword'])
        } else {
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
        this.MainApp.hideLoading();
        console.log(err);
      });
  }

  cnicMasking(event: any): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    let formattedValue = value;

    // Mask the value based on length
    if (value.length > 5 && value.length <= 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5, 12)}`;
    } else if (value.length > 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(
        5,
        12
      )}-${value.slice(12, 13)}`;
    }

    // Make sure to update the value only after the mask is applied
    const x: HTMLInputElement = document.getElementById(
      'cnic'
    ) as HTMLInputElement;
    if (x.value !== formattedValue) {
      x.value = formattedValue;
    }
  }
}
