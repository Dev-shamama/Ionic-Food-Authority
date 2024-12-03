import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'authguard.guard';
import { PageguardGuard } from 'pageguard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'licenseform',
    loadChildren: () =>
      import('./licenseform/licenseform.module').then(
        (m) => m.LicenseformPageModule
      ),
    canActivate: [PageguardGuard],
  },
  {
    path: 'licensedetail/:id',
    loadChildren: () =>
      import('./licensedetail/licensedetail.module').then(
        (m) => m.LicensedetailPageModule
      ),
    canActivate: [PageguardGuard],
  },
  {
    path: 'success',
    loadChildren: () =>
      import('./success/success.module').then((m) => m.SuccessPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'challanlist',
    loadChildren: () =>
      import('./challanlist/challanlist.module').then(
        (m) => m.ChallanlistPageModule
      ),
    canActivate: [PageguardGuard],
  },
  {
    path: 'verificationprocess',
    loadChildren: () =>
      import('./verificationprocess/verificationprocess.module').then(
        (m) => m.VerificationprocessPageModule
      ),
    canActivate: [PageguardGuard],
  },
  {
    path: 'uploaddocument/:id',
    loadChildren: () =>
      import('./uploaddocument/uploaddocument.module').then(
        (m) => m.UploaddocumentPageModule
      ),
    canActivate: [PageguardGuard],
  },
  {
    path: 'paychallan/:id',
    loadChildren: () =>
      import('./paychallan/paychallan.module').then(
        (m) => m.PaychallanPageModule
      ),
    canActivate: [PageguardGuard],
  },
  {
    path: 'forgetpassword',
    loadChildren: () =>
      import('./forgetpassword/forgetpassword.module').then(
        (m) => m.ForgetpasswordPageModule
      ),
      canActivate: [AuthguardGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'sendotp/:uid/:form',
    loadChildren: () =>
      import('./sendotp/sendotp.module').then((m) => m.SendotpPageModule),
    canActivate: [AuthguardGuard],

  },
  {
    path: 'verifyotp/:uid/:form',
    loadChildren: () =>
      import('./verifyotp/verifyotp.module').then((m) => m.VerifyotpPageModule),
    canActivate: [AuthguardGuard],

  },
  {
    path: 'resetpassword/:uid/:otp',
    loadChildren: () =>
      import('./resetpassword/resetpassword.module').then(
        (m) => m.ResetpasswordPageModule
      ),
      canActivate: [AuthguardGuard],
  },
  {
    path: 'licenseview/:id',
    loadChildren: () =>
      import('./licenseview/licenseview.module').then(
        (m) => m.LicenseviewPageModule
      ),
    canActivate: [PageguardGuard],
  },
  {
    path: 'sfo',
    loadChildren: () => import('./sfoc/sfoc.module').then( m => m.SfocPageModule)
  },
  {
    path: 'update-license/:id',
    loadChildren: () => import('./update-license/update-license.module').then( m => m.UpdateLicensePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
