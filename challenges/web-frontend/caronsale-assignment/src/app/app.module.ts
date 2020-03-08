import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AuctionsOverviewComponent } from './auctions-overview/auctions-overview.component';
import { LoginComponent } from './login/login.component';
//Angular material modules
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';

import { Dot, Slides } from './auctions-overview/auctions-overview.component'

//Services
import { AuctionService } from '../services/auctionService/auction.service'
import { AuthenticationService } from '../services/authenticationService/authentication.service';
import { TransformFuelPipe } from '../pipes/transform-fuel.pipe'
import { TransformTransmissionPipe } from '../pipes/transform-transmission.pipe'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuctionsOverviewComponent,
    LoginComponent,
    Dot,
    Slides,
    TransformFuelPipe,
    TransformTransmissionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [
    AuthenticationService,
    AuctionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
