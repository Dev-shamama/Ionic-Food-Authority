import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },  {
    path: 'licenseform',
    loadChildren: () => import('./licenseform/licenseform.module').then( m => m.LicenseformPageModule)
  },
  {
    path: 'licensedetail',
    loadChildren: () => import('./licensedetail/licensedetail.module').then( m => m.LicensedetailPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'challanlist',
    loadChildren: () => import('./challanlist/challanlist.module').then( m => m.ChallanlistPageModule)
  },
  {
    path: 'verificationprocess',
    loadChildren: () => import('./verificationprocess/verificationprocess.module').then( m => m.VerificationprocessPageModule)
  },
  {
    path: 'uploaddocument',
    loadChildren: () => import('./uploaddocument/uploaddocument.module').then( m => m.UploaddocumentPageModule)
  },
  {
    path: 'paychallan',
    loadChildren: () => import('./paychallan/paychallan.module').then( m => m.PaychallanPageModule)
  },
  {
    path: 'forgetpassword',
    loadChildren: () => import('./forgetpassword/forgetpassword.module').then( m => m.ForgetpasswordPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'sendotp',
    loadChildren: () => import('./sendotp/sendotp.module').then( m => m.SendotpPageModule)
  },
  {
    path: 'verifyotp',
    loadChildren: () => import('./verifyotp/verifyotp.module').then( m => m.VerifyotpPageModule)
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
