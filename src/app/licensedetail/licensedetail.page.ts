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

  myFunc() {

    var divContents = document.getElementById('divContents')?.innerHTML;
    let printWindow: any = window.open('', '', 'height=800,width=1000');
    printWindow.document.write(`<html><head><title>Reports</title>
      <link rel="stylesheet" href="assets/licenseView.css">
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      
      * {
          font-family: "Poppins", serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
      }
      body{
          background:white;
      }
      </style>
      `);
    printWindow.document.write('</head><body>');

    printWindow.document.write(divContents);

    printWindow.document.write('</body></html>');

    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
    },2000)
  }

}
