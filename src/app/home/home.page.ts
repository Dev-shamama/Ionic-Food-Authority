import { ApiService } from 'api.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public menuBar: MenuController, private apiService: ApiService) {}

  ngOnInit() {
    this.menuBar.close();

    this.apiService.getToken().then((e: any) => {
      this.apiService
        .getLicense(e.access_token)
        .then(async (res: any) => {
          if (res.reponse_type == 'success') {
          }
        })
        .catch(async (err: any) => {
          console.log(err);
        });
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
}
