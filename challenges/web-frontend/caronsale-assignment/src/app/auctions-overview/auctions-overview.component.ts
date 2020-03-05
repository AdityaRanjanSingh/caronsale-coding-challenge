import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auctionService/auction.service'
@Component({
  selector: 'app-auctions-overview',
  templateUrl: './auctions-overview.component.html',
  styleUrls: ['./auctions-overview.component.scss']
})
export class AuctionsOverviewComponent implements OnInit {
  public auctions: any[];
  constructor(auctionService: AuctionService) {

  }

  ngOnInit(): void {
    setInterval(this.getAuctions(), 20000)
  }

  getAuctions(): void {
    this.auctionService.getAuctions().then(d => {
      this.auctions = d;
    }).catch(e => {
      this.handleError()
    })
  }
  handleError(): void {

  }
}
