import { Component} from '@angular/core';

@Component({
  selector: 'app-licensedetail',
  templateUrl: './licensedetail.page.html',
  styleUrls: ['./licensedetail.page.scss'],
})
export class LicensedetailPage {

  constructor() { }

  
  openModel(event: any) {
    let typeAPICall = 1;
    const button = event.target.dataset;
    if(button == 'cnic') {
      typeAPICall = 1
    }

    

    document.getElementById('model-container')?.classList.add('active')
  }

  closeModel() {
    document.getElementById('model-container')?.classList.remove('active')
  }

}
