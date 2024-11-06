import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const s: any = document.getElementById('sidebar-main-container');
    // s.style.width = '0'
    s.setAttribute('style', '--side-min-width: 0; --side-max-width: 0');
    console.log(s)
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
