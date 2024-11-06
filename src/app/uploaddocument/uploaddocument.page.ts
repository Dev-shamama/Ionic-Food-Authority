import { Component } from '@angular/core';

@Component({
  selector: 'app-uploaddocument',
  templateUrl: './uploaddocument.page.html',
  styleUrls: ['./uploaddocument.page.scss'],
})
export class UploaddocumentPage {
  constructor() {}

  // CNIC
  cnicDocument() {
    const inputElement = document.getElementById(
      'cnic-input'
    ) as HTMLInputElement;
    inputElement.click();
  }

  cnicDocumentInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const cnicIcon = document.getElementById('cnic-icon');
      cnicIcon?.setAttribute('name', 'checkmark-circle-outline');
      cnicIcon?.setAttribute('style', 'color: #46b64a');
      this.show('cnic-hide');
      this.hide('cnic-text');
      const imageName: any = document.getElementById('cnic-image-name');
      const imageSize: any = document.getElementById('cnic-image-size');

      imageName.textContent = `Name: ${file.name}`;
      imageSize.textContent = `Size: ${this.formatSizeUnits(file.size)}`;
    }
  }

  // Tenancy

  tenancyDocument() {
    const inputElement = document.getElementById(
      'tenancy-input'
    ) as HTMLInputElement;
    inputElement.click();
  }

  tenancyDocumentInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const tenancyIcon = document.getElementById('tenancy-icon');
      tenancyIcon?.setAttribute('name', 'checkmark-circle-outline');
      tenancyIcon?.setAttribute('style', 'color: #46b64a');
      this.show('tenancy-hide');
      this.hide('tenancy-text');
      const imageName: any = document.getElementById('tenancy-image-name');
      const imageSize: any = document.getElementById('tenancy-image-size');

      imageName.textContent = `Name: ${file.name}`;
      imageSize.textContent = `Size: ${this.formatSizeUnits(file.size)}`;
    }
  }

  // Certificate

  certificateDocument() {
    const inputElement = document.getElementById(
      'certificate-input'
    ) as HTMLInputElement;
    inputElement.click();
  }

  certificateDocumentInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const certificateIcon = document.getElementById('certificate-icon');
      certificateIcon?.setAttribute('name', 'checkmark-circle-outline');
      certificateIcon?.setAttribute('style', 'color: #46b64a');
      this.show('certificate-hide');
      this.hide('certificate-text');
      const imageName: any = document.getElementById('certificate-image-name');
      const imageSize: any = document.getElementById('certificate-image-size');

      imageName.textContent = `Name: ${file.name}`;
      imageSize.textContent = `Size: ${this.formatSizeUnits(file.size)}`;
    }
  }

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
    }
  }

  // Lab Testing

  labTestingDocument() {
    const inputElement = document.getElementById(
      'labTesting-input'
    ) as HTMLInputElement;
    inputElement.click();
  }

  labTestingDocumentInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const labTestingIcon = document.getElementById('labTesting-icon');
      labTestingIcon?.setAttribute('name', 'checkmark-circle-outline');
      labTestingIcon?.setAttribute('style', 'color: #46b64a');
      this.show('labTesting-hide');
      this.hide('labTesting-text');
      const imageName: any = document.getElementById('labTesting-image-name');
      const imageSize: any = document.getElementById('labTesting-image-size');

      imageName.textContent = `Name: ${file.name}`;
      imageSize.textContent = `Size: ${this.formatSizeUnits(file.size)}`;
    }
  }

  // Medical

  medicalDocument() {
    const inputElement = document.getElementById(
      'medical-input'
    ) as HTMLInputElement;
    inputElement.click();
  }

  medicalDocumentInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const medicalIcon = document.getElementById('medical-icon');
      medicalIcon?.setAttribute('name', 'checkmark-circle-outline');
      medicalIcon?.setAttribute('style', 'color: #46b64a');
      this.show('medical-hide');
      this.hide('medical-text');
      const imageName: any = document.getElementById('medical-image-name');
      const imageSize: any = document.getElementById('medical-image-size');

      imageName.textContent = `Name: ${file.name}`;
      imageSize.textContent = `Size: ${this.formatSizeUnits(file.size)}`;
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
}
