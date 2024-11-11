import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-licensedetail',
  templateUrl: './licensedetail.page.html',
  styleUrls: ['./licensedetail.page.scss'],
})
export class LicensedetailPage {
  documentUniqueName = '';

  activeCnic = '';
  fileNameCnic = '';

  activeChallan = '';
  activeDocuments = '';
  activePrevious = '';
  activeLab = '';

  fileObject: any = {
    cnic: null,
    challan: null,
    documents: null,
    previous: null,
    lab: null,
  };

  image: string; 

  constructor(private sanitizer: DomSanitizer) {
    this.image = 'http://localhost:8100/assets/img/certificate.png';
  }

  getDownloadUrl(): SafeUrl {
    const dataUrl = 'data:image/jpeg;base64,'; 
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl + this.image);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const documentUniqueName = this.documentUniqueName;
    if (input && input.files) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (documentUniqueName === 'cnic') {
            this.activeCnic = 'active';
            this.fileObject.cnic = reader.result;
          }

          if (documentUniqueName === 'challan') {
            this.activeChallan = 'active';
            this.fileObject.challan = reader.result;
          }

          if (documentUniqueName === 'documents') {
            this.activeDocuments = 'active';
            this.fileObject.documents = reader.result;
          }

          if (documentUniqueName === 'previous') {
            this.activePrevious = 'active';
            this.fileObject.previous = reader.result;
          }

          if (documentUniqueName === 'lab') {
            this.activeLab = 'active';
            this.fileObject.lab = reader.result;
          }

       
          console.log(this.fileObject)

          this.closeModel();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  openModel(event: any, modaltype: any) {
    console.log('data-pop value:', modaltype);
    document.getElementById('model-container')?.classList.add('active');

    this.documentUniqueName = modaltype;
  }

  closeModel() {
    document.getElementById('model-container')?.classList.remove('active');
  }
}
