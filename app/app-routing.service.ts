import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginCompComponent } from './portal-page/dynamic/login-comp/login-comp.component';
import { ApplicationFormComponent } from './portal-page/dynamic/application-form/application-form.component';
import { PreviousApplicationsComponent } from './portal-page/dynamic/previous-applications/previous-applications.component';
import { ColourSchemeComponent } from './portal-page/dynamic/colour-scheme/colour-scheme.component';


const appRoutes:Routes = [
  { path: 'login', component: LoginCompComponent },
  { path: 'form', canActivate:[AuthGuardService], component: ApplicationFormComponent },
  { path: 'history', canActivate:[AuthGuardService], component: PreviousApplicationsComponent },
  { path: 'colour-scheme',canActivate:[AuthGuardService], component: ColourSchemeComponent },
  { path: '**', redirectTo: 'login' }// component: LoginCompComponent
];


@NgModule ({
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingService {
  constructor() {}
}
