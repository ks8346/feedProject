import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateProposalComponent } from './landing-page/create-proposal/create-proposal.component';

const routes: Routes = [
  {path: '',component:LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing=[LandingPageComponent,CreateProposalComponent]
