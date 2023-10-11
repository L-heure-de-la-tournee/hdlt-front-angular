import { NgModule, isDevMode } from '@angular/core';
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
import { HistoryComponent } from './views/history/history.component';
import { RulesComponent } from './views/rules/rules.component';
import { StatusSmallCardComponent } from './components/status-small-card/status-small-card.component';
import { AchievementComponent } from './components/achievement/achievement.component';
import { QuotesComponent } from './views/quotes/quotes.component';
import { NewQuoteComponent } from './views/new-quote/new-quote.component';
import { NewComponent } from './views/new/new.component';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { ReactionPickerComponent } from './components/reaction-picker/reaction-picker.component';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    NavComponent,
    HistoryComponent,
    RulesComponent,
    StatusSmallCardComponent,
    AchievementComponent,
    QuotesComponent,
    NewQuoteComponent,
    NewComponent,
    QuoteCardComponent,
    ReactionPickerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
