import { Component } from '@angular/core';
import { ApiService } from 'api.service';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-renewuploaddocument',
  templateUrl: './renewuploaddocument.page.html',
  styleUrls: ['./renewuploaddocument.page.scss'],
})
export class RenewuploaddocumentPage {

  licenceId: any;
  constructor(
    private apiService: ApiService,
    private route: Router,
    public MainApp: AppComponent,
    private urlParam: ActivatedRoute
  ) {
    this.licenceId = this.urlParam.snapshot.paramMap.get('id');
  }

  uploadBase64: {
    Copy_of_Challan_form: any;
  } = {
      Copy_of_Challan_form: null,
    };



  // Challan

  challanDocument() {
    const inputElement = document.getElementById(
      'challan-input'
    ) as HTMLInputElement;
    inputElement.click();
  }

  challanDocumentInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const challanIcon = document.getElementById('challan-icon');
      challanIcon?.setAttribute('name', 'checkmark-circle-outline');
      challanIcon?.setAttribute('style', 'color: #46b64a');
      this.show('challan-hide');
      this.hide('challan-text');
      const imageName: any = document.getElementById('challan-image-name');
      const imageSize: any = document.getElementById('challan-image-size');

      imageName.textContent = `Name: ${file.name}`;
      imageSize.textContent = `Size: ${this.formatSizeUnits(file.size)}`;

      const reader = new FileReader();
      reader.onload = () => {
        this.uploadBase64.Copy_of_Challan_form = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  // Utility Function
  toggleVisibility(show: string, hide: string): void {
    this.hide(show);
    this.show(hide);
  }

  // Helper to hide an element by id
  hide(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = 'none';
    }
  }

  // Helper to show an element by id
  show(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = 'block';
    }
  }

  formatSizeUnits(bytes: any) {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes > 1) {
      bytes = bytes + ' bytes';
    } else if (bytes == 1) {
      bytes = bytes + ' byte';
    } else {
      bytes = '0 bytes';
    }
    return bytes;
  }

  submitForUploadDocument() {
    this.MainApp.showLoading();

    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .uploadLicenseDocument(
            e.access_token,
            this.uploadBase64,
            this.licenceId
          )
          .then(async (res: any) => {
            this.MainApp.hideLoading();
            if (res.reponse_type == "success") {
              this.route.navigate(['/success'])

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
      })
      .catch((err: any) => {
        this.MainApp.hideLoading();
        console.error(err);
      });
  }
}
