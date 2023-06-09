import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { OngoingComponent } from './views/ongoing/ongoing.component';
import { ProfileComponent } from './views/profile/profile.component';
import { HistoryComponent } from './views/history/history.component';
import { RulesComponent } from './views/rules/rules.component';
import { NewStatusComponent } from './views/new-status/new-status.component';
import { IsVerfiedAuthGuard } from './services/isverified.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path:"login", component: LoginComponent},
  { path: "signup", component: SignupComponent },
  { path: "ongoing", component: OngoingComponent, canActivate: [IsVerfiedAuthGuard] },
  { path: "history", component: HistoryComponent, canActivate: [IsVerfiedAuthGuard] },
  { path: "rules", component: RulesComponent, canActivate: [IsVerfiedAuthGuard] },
  { path: "profile", component: ProfileComponent},
  { path: "new-status", component: NewStatusComponent, canActivate: [IsVerfiedAuthGuard]},
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
