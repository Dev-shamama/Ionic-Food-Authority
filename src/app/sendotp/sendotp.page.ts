import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ApiService } from 'api.service';

@Component({
  selector: 'app-sendotp',
  templateUrl: './sendotp.page.html',
  styleUrls: ['./sendotp.page.scss'],
})
export class SendotpPage implements OnInit {
  @ViewChild('otpType')
  otpType: NgForm | undefined;
  uid:any
  otp_type:any = "email"

  constructor(
    private apiService: ApiService,
    private route: Router,
    private urlParam: ActivatedRoute
  ) {
    // this.urlParam.paramMap.subscribe((params) => {
    //   // this.dataset.uid = params.get('uid')!;
    // });
  }

  checkUserIdFunction() {
    this.apiService
      .checkUserId({ uid: this.uid})
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
    this.uid = this.urlParam.snapshot.paramMap.get('uid');

    this.checkUserIdFunction();

    const s: any = document.getElementById('sidebar-main-container');
    // s.style.width = '0'
    s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');

    const emailSecure: any = document.getElementById('email');
    const numberSecure: any = document.getElementById('number');

    const maskedEmail = this.maskEmail(emailSecure?.textContent);
    emailSecure.innerHTML = maskedEmail;

    const maskedPhone = this.maskPhoneNumber(numberSecure?.textContent);
    numberSecure.innerHTML = String(maskedPhone);
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
          this.route.navigate(['/verifyotp'])
          // this.route.navigate([`/sendotp/${res.uid}`])
        }
      })
      .catch(async (err: any) => {
        console.log(err);
      });
  }

  maskEmail(email: string) {
    // Split the email into local part and domain part
    const outputString = this.convertHtmlEntity(email);

    const [localPart, domain] = outputString.split('@');

    // Mask the local part starting from the 8th character
    const maskedLocal =
      localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);

    // Return the masked email
    return maskedLocal + '@' + domain;
  }

  maskPhoneNumber(phone: any) {
    // Ensure the phone number is at least 10 characters long
    if (phone.length < 10) {
      throw new Error('Phone number must be at least 10 characters long');
    }

    // Slice the phone number: keep the first 2 characters, mask the middle, and keep the last 2 characters
    const maskedPhone = phone.slice(0, 2) + '*******' + phone.slice(-2);

    return maskedPhone;
  }
  convertHtmlEntity(str: any) {
    return str.replace(/&#64;/g, '@');
  }
}
