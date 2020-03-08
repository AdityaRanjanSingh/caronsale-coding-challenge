import { Component, OnInit, ViewChildren, Directive, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { AuctionService } from '../../services/auctionService/auction.service';
@Directive({
  selector: '.mySlides'
})
export class Slides {

}
@Directive({
  selector: '.dot'
})
export class Dot {
}
@Component({
  selector: 'app-auctions-overview',
  templateUrl: './auctions-overview.component.html',
  styleUrls: ['./auctions-overview.component.scss']
})
export class AuctionsOverviewComponent implements OnInit {
  public auctions: any[];
  public slidesIndex: any[] = [];
  public selectedAuction: any;
  @ViewChildren(Slides, { read: ElementRef }) slides: QueryList<ElementRef>;
  @ViewChildren(Dot, { read: ElementRef }) dots: QueryList<ElementRef>;
  constructor(private auctionService: AuctionService, private renderer: Renderer2) {

  }

  async ngOnInit() {
    await this.getAuctions();
    // awai 
    // setInterval(() => { this.getAuctions() }, 20000)
  }
  ngAfterViewInit() {
    console.log(this.slides, "this.slides")
    this.slides.changes.subscribe((e) => {
      this.showFirstSlides();
    });
    this.dots.changes.subscribe((e) => {
      this.slidesIndex.forEach(a => {
        this.setDotsSelected(a);
      })

    });
  }
  setDotsSelected(dot) {
    let auctionDots = this.dots.filter((el, i) => el.nativeElement.id === dot.id);
    let dotElement: ElementRef = auctionDots.find((el, i) => i === dot.slideIndex - 1)
    this.dots.forEach((a: ElementRef) => {
      if (a.nativeElement.id === this.selectedAuction.id) {
        this.renderer.removeClass(a.nativeElement, 'active')
      }
    });
    this.renderer.addClass(dotElement.nativeElement, "active");

  }
  getAuctions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auctionService.getRunningAuctions().then(d => {
        this.auctions = d;
        this.slidesIndex = d.map(a => {
          return { id: JSON.stringify(a.id), slideIndex: 1, }
        })
        resolve()
      }).catch(e => {
        this.handleError()
        reject()
      })
    })

  }
  handleError(): void {

  }

  showFirstSlides() {
    this.slidesIndex.forEach(a => {
      this.selectedAuction = a;
      this.showSlides(a.slideIndex)
    })
  }



  plusSlides(n, auction) {
    this.selectedAuction = { id: JSON.stringify(auction.id) }
    let selectedSlide;
    this.slidesIndex.forEach(a => {
      if (a.id === JSON.stringify(auction.id)) {
        a.slideIndex += n
        selectedSlide = a;
      }
    })
    this.showSlides(selectedSlide.slideIndex);
  }

  currentSlide(n, auction) {
    let selectedSlide;
    this.slidesIndex.forEach(a => {
      if (a.id === JSON.stringify(auction.id)) {
        a.slideIndex = n
        selectedSlide = a;
      }
    })
    this.showSlides(selectedSlide.slideIndex = n);
  }

  showSlides(n) {
    var i;
    let auctionSlides = this.slides.filter((el, i) => el.nativeElement.id === this.selectedAuction.id);
    let auctionDots = this.dots.filter((el, i) => el.nativeElement.id === this.selectedAuction.id);
    let slideIndexTemp = this.slidesIndex.find(a => a.id === this.selectedAuction.id)
    if (n > auctionSlides.length) { slideIndexTemp.slideIndex = 1 }
    if (n < 1) { slideIndexTemp.slideIndex = this.slides.length }
    let slideElement: ElementRef = auctionSlides.find((el, i) => i === (slideIndexTemp.slideIndex - 1))
    let dotElement: ElementRef = auctionDots.find((el, i) => i === (slideIndexTemp.slideIndex - 1))
    auctionSlides.forEach((a: ElementRef) => {
      this.renderer.setStyle(a.nativeElement, 'display', 'none');
      this.renderer.removeClass(a.nativeElement, 'show');
    })
    this.dots.forEach((a: ElementRef) => {
      if (a.nativeElement.id === this.selectedAuction.id) {
        this.renderer.removeClass(a.nativeElement, 'active')
      }
    })

    this.renderer.setStyle(slideElement.nativeElement, 'display', "block");
    this.renderer.addClass(slideElement.nativeElement, 'show');
    if (dotElement) {
      this.renderer.addClass(dotElement.nativeElement, "active");
    }

    this.slidesIndex.forEach(a => {
      if (a.id === slideIndexTemp.id) { a.slideIndex = slideIndexTemp.slideIndex }
    });
  }
  onImageError(event) {
    event.target.src = 'https://via.placeholder.com/200'
  }
}
