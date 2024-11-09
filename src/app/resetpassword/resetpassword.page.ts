import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  @ViewChild('resetPassword')
  resetPassword: NgForm | undefined;
  constructor() { }

  ngOnInit(): void {
    const s: any = document.getElementById('sidebar-main-container');
    // s.style.width = '0'
    s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
  }
  dataset = {
    newPassword: '',
    confirmPassword: '',
  }

  
  onSubmit() {
    console.log(this.dataset);
    // console.log(this.dataset.cnic.slice(0, 15));
  }

}
