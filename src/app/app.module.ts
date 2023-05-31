import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastComponent } from './components/toast/toast.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { HomeComponent } from './views/home/home.component';
import { OngoingComponent } from './views/ongoing/ongoing.component';
import { NewStatusComponent } from './views/new-status/new-status.component';
import { ProfileComponent } from './views/profile/profile.component';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    UserCardComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    OngoingComponent,
    NewStatusComponent,
    ProfileComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
