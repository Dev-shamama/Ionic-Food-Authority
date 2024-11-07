import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sendotp',
  templateUrl: './sendotp.page.html',
  styleUrls: ['./sendotp.page.scss'],
})
export class SendotpPage implements OnInit {
  constructor() {}

  ngOnInit(): void {
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
