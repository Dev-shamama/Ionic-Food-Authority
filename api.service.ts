import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { Platform } from '@ionic/angular';
import { ToastController , LoadingController } from '@ionic/angular';
import { Router  , NavigationStart , Event as NavigationEvent  } from '@angular/router';
import * as $ from 'jquery'
import { Storage } from '@ionic/storage-angular'; 
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public domain = 'https://app.movementprovanlines.com'
  localhost:string = 'https://app.movementprovanlines.com';
  previousUrl: string = '';
  plt: string;
  web_get_restricted = 0;
  web_post_restricted = 0;
  web_put_restricted = 0;
  web_delete_restricted = 0;

  android_get_restricted = 0;
  android_post_restricted = 0;
  android_put_restricted = 0;
  android_delete_restricted = 0;

  ios_get_restricted = 0;
  ios_post_restricted = 0;
  ios_put_restricted = 0;
  ios_delete_restricted = 0;

  success_model_is_open = false

  constructor(

    private platform: Platform , 
    public toastController: ToastController , 
    private router: Router,
    private storage: Storage,
    private _location: Location,
    private loadingCtrl: LoadingController,

  ) {
    this.plt = this.platform.is('mobileweb') ? 'web' :
    this.platform.is('ios') ? 'ios' : 'android';
    this.localhost = "https://app.movementprovanlines.com" // put your IP here
    // this.localhost = "http://192.168.18.116:8888" // put your IP here
    this.initStorage()

   }


   async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Page Loading...',
      spinner:'circles'
    });

    loading.present();
  }
  
  async removeLoading() {
    await this.loadingCtrl.dismiss()
  }



  
  
  async login(credentials: any):Promise<any> {
    return new Promise<any>((resolve) => {

      const data = credentials
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      }
      fetch(`${this.localhost}/login/`, options)
        .then(async response => {
          const data = await response.json();
          if (data.success) {
            this.displayToast(data.success.msg , 'bottom' , 'toast-succes' , 'checkmark-circle-sharp' , 'success')
            var access_token = data.success.token.access
            var refrash_token = data.success.token.refresh
            this.saveTokens(access_token , refrash_token)
            
            resolve(data)
          }
          else{
            this.displayToast(data.errors.non_field_errors[0] , 'bottom' , 'toast-error' , 'warning-outline' , 'danger')
            resolve(data)
          }
          
          
        })
        .catch(e => {
          
          resolve(e)
        })

      
      })
      
  }




  
  async AccessTokenvalid(access_token: any , refrash_token:any):Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
   
        },
        
      }
  
      fetch(`${this.localhost}/Tokenvalidcheck/`, options)
        .then(async response => {
          const data = await response.json();
        
            resolve(data)
        
        })
        .catch(e => {

          resolve(e)
        
        })
    
    })
  
      
      
  }


  
  async RefrashTokenvalid(refrash_token:any):Promise<any> {
    return new Promise<any>((resolve) => {

      const data = {"RefrashToken":refrash_token}
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) 
        
      }
      fetch(`${this.localhost}/refrashToken/`, options)
        .then(async response => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
          
            this.saveTokens(data.token.access , data.token.refresh)
          }
          resolve(data)
        
        })
        .catch(e => {
         
          resolve(e)
        })
      })
      
      
    }








  


  

  
  async ChangePassword(data:any , access_token:any , refrash_token:any):Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
   
        },
        body: JSON.stringify(data) 

      }
      fetch(`${this.localhost}/changepassword/`, options)
        .then(async response => {
          const data = await response.json();
          if (data.reponse_type == "success") {
              resolve(data)
              this.loadingCtrl.dismiss()
              this.displayToast(data.msg , 'bottom' , 'toast-succes' , 'checkmark-circle-sharp' , 'success')
          }
          else{
            if (data.msg == 'login_not'){
              this.loadingCtrl.dismiss()
              this.router.navigate(['/login'])
              this.displayToast('Session Expaired Login Again' , 'bottom' , 'toast-error' , 'warning-outline' , 'danger')
            }
            else{
              this.loadingCtrl.dismiss()
              if(data.msg){
                this.displayToast(data.msg , 'bottom' , 'toast-error' , 'warning-outline' , 'danger')
              }
            }
       
          }
          
        })
        .catch(async e => {
          this.loadingCtrl.dismiss()
          alert("Something went wrong")
          this.displayToast(e , 'bottom' , 'toast-error' , 'warning-outline' , 'danger')
      })
      
    
    })
  
      
      
  }



  async ForgetPassword(data:any):Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
   
        },
        body: JSON.stringify(data) 

      }
      fetch(`${this.localhost}/send-reset-password-email/`, options)
        .then(async response => {
          const data = await response.json();
          if (data.reponse_type == "success") {
              resolve(data)
              this.loadingCtrl.dismiss()
              
          }
          else{
            if (data.msg == 'login_not'){
              this.loadingCtrl.dismiss()
              this.router.navigate(['/login'])
              this.displayToast('Session Expaired Login Again' , 'bottom' , 'toast-error' , 'warning-outline' , 'danger')
            }
            else{
              this.loadingCtrl.dismiss()
              if(data.msg){
                this.displayToast(data.msg , 'bottom' , 'toast-error' , 'warning-outline' , 'danger')
              }
            }
       
          }
          
        })
        .catch(async e => {
          this.loadingCtrl.dismiss()
          alert("Something went wrong")
          this.displayToast(e , 'bottom' , 'toast-error' , 'warning-outline' , 'danger')
      })
      
    
    })
  
      
      
  }



    

  // token handel 
  async saveTokens(access: string, refresh: string): Promise<void> {
    await SecureStoragePlugin.set({ key: 'access_token', value: access });
    await SecureStoragePlugin.set({ key: 'refresh_token', value: refresh });
  }

  async getToken(): Promise<Object> {
    const access_token = await SecureStoragePlugin.get({ key: 'access_token' });
    const refrash_token = await SecureStoragePlugin.get({ key: 'refresh_token' });
    return {'access_token':access_token.value , 'refrash_token':refrash_token.value}
  }


  async removeTokens(): Promise<void> {
    await SecureStoragePlugin.remove({ key: 'access_token' });
    await SecureStoragePlugin.remove({ key: 'refresh_token' });
    // this.displayToast("Account Logout" , 'bottom' , 'toast-success' , 'checkmark-circle-sharp' , 'success')
    this.router.navigate(['/login'])

  }



  // async SaveCartItem(Items: any): Promise<void> {
  //   await SecureStoragePlugin.set({ key: 'cart_items', value: Items });
  // }


  // async GetCartItem(): Promise<Object> {
  //   const cartitems = await SecureStoragePlugin.get({ key: 'cart_items'});
  //   return cartitems
  // }


  // async ClearCartItems(): Promise<void> {
  //   await SecureStoragePlugin.remove({ key: 'cart_items' });
  //   this.displayToast("All Items Clear" , 'bottom' , 'toast-success' , 'checkmark-circle-sharp' , 'success')

  // }


  async initStorage() {
    await this.storage.create();
  }

  // To store data
  async setstorageData(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  // To retrieve data
  async getstorageData(key: string): Promise<any> {
    return await this.storage.get(key);
  }

 
  async removestorageData(key: string): Promise<void> {
    this.storage.remove(key)
    // this.displayToast("All Items Clear" , 'bottom' , 'toast-success' , 'checkmark-circle-sharp' , 'success')
  }
  






  



  displayToast(msg:any , pos:any , tclass:any , type:any , color:any) {
    
    // Stop multiple toasts 
    try {
      this.toastController.dismiss().then(() => {
      }).catch(() => {
      }).finally(() => {
        console.log('Closed')
      });
    } catch(e) {}
    
      this.toastController.create({
        message: msg,
        position: pos,
        duration: 3000,
        cssClass: tclass,
        color:color,
        buttons: [
          {
            side: 'start',
            icon: type,
            handler: () => {
              console.log('');
            }
          }, {
            side: 'end',
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('');
            }
          }
        ]
      }).then((toast) => {
        toast.present();
      });
  }



}
