import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  @ViewChild('userProfile')
  userProfile: NgForm | undefined;

  @ViewChild('changePassword')
  changePassword: NgForm | undefined;

  constructor() { }

  profileDataset = {
    name: null,
    cnic: null,
    email: null,
    phone: null,
  }

  onSubmitUserProfile() {
    console.log(this.profileDataset);
  }

  passwordDataset = {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  }

  onSubmitPassword() {
    console.log(this.passwordDataset);
  }


  
  cnicMasking(event: any): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
  
    let formattedValue = value;
  
    if (value.length > 5 && value.length <= 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5, 12)}`;
    } else if (value.length > 12) {
      formattedValue = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12, 13)}`;
    }
  
    let x:any = document.getElementById('cnic')
    x.value = formattedValue;
  }

}
