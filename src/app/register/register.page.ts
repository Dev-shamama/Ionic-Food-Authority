import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const s: any = document.getElementById('sidebar-main-container');
    // s.style.width = '0'
    s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
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
