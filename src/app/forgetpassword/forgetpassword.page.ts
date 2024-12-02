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

  
  cardMask = this.MainApp.cardMask
  maskPredicate = this.MainApp.maskPredicate


  ngOnInit(): void {
   
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

  
}
