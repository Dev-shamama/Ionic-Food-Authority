import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('userLogin')
  userLogin: NgForm | undefined;
  constructor(private apiService: ApiService, private route: Router , public MainApp: AppComponent) {}

  ngOnInit(): void {
    // const s: any = document.getElementById('sidebar-main-container');
    // // s.style.width = '0'
    // s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
  }

  dataset = {
    username: '',
    password: '',
  };

  onSubmit() {

    // console.log(this.dataset.cnic.slice(0, 15));
    this.MainApp.showLoading();
    this.apiService
      .login(this.dataset)
      .then(async (res: any) => {
        this.MainApp.hideLoading();
        if (res.success.msg == 'Login Success') {
          this.route.navigate([`/sendotp/${res.success.uid}/login`]);
        } else {
          return;
        }
      })
      .catch(async (err: any) => {
        this.MainApp.hideLoading();
        return 
      });
  }


  cnicMasking(event: any): void {
    const input = event.target;
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

    let x: any = document.getElementById('loginCnic');
    x.value = formattedValue;
  }
}
