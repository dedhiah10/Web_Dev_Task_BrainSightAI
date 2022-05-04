import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginCompComponent } from './portal-page/dynamic/login-comp/login-comp.component';
import { PortalPageComponent } from './portal-page/portal-page.component';
import { ApplicationFormComponent } from './portal-page/dynamic/application-form/application-form.component';
import { PreviousApplicationsComponent } from './portal-page/dynamic/previous-applications/previous-applications.component';
import { FooterBarComponent } from './portal-page/footer-bar/footer-bar.component';
import { NavBarComponent } from './portal-page/nav-bar/nav-bar.component';

import { AppRoutingService } from './app-routing.service';
import { HttpClientModule } from '@angular/common/http';
import { ColorSchemeService } from './color-scheme.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginCompComponent,
    PortalPageComponent,
    ApplicationFormComponent,
    PreviousApplicationsComponent,
    FooterBarComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingService,
    HttpClientModule
  ],
  providers: [
  //  ColorSchemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
