import { Component, OnInit , ViewChild , Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';

@Component({
  selector: 'app-otp-type',
  templateUrl: './otp-type.component.html',
  styleUrls: ['./otp-type.component.scss'],
})
export class OtpTypeComponent  implements OnInit {

  @ViewChild('otpType')
  otpType: NgForm | undefined;
  @Input() uid: string | null = ''; // Declare uid as an @Input
  otp_type:any = "email"

  show_enter_otp = false

  constructor(
    private apiService: ApiService,
    private route: Router,
    private urlParam: ActivatedRoute
  ) {

 
  }

  checkUserIdFunction(uid: any) {
    this.apiService
      .checkUserId({uid})
      .then(async (res: any) => {
        if (res.reponse_type == 'success') {
        }
        // this.route.navigate(['/register'])
      })
      .catch(async (err: any) => {
        // this.route.navigate(['/register'])
      });
  }

  ngOnInit(): void {
    console.log(this.uid)
    this.checkUserIdFunction(this.uid);

  }

  onSubmitFullForm() {

    this.apiService
      .otpType({uid: this.uid, otp_type: this.otp_type})
      .then(async (res: any) => {
        console.log(res);
        if (res.reponse_type == 'success') {
          this.apiService.displayToast(
            res.msg,
            'bottom',
            'toast-succes',
            'checkmark-circle-sharp',
            'success'
          );
          this.show_enter_otp = true
        }
      })
      .catch(async (err: any) => {
        console.log(err);
      });
  }

  
}
