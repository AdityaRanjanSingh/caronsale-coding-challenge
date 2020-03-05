import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuctionsOverviewComponent } from './auctions-overview/auctions-overview.component'


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "auctionOverview", component: AuctionsOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
