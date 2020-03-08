import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsOverviewComponent, Dot, Slides } from './auctions-overview.component';
import { AuctionService } from '../../services/auctionService/auction.service'
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { TransformFuelPipe } from '../../pipes/transform-fuel.pipe'
import { TransformTransmissionPipe } from '../../pipes/transform-transmission.pipe'
describe('AuctionsOverviewComponent', () => {
  let component: AuctionsOverviewComponent;
  let fixture: ComponentFixture<AuctionsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuctionsOverviewComponent, TransformTransmissionPipe, TransformFuelPipe, Dot, Slides],
      imports: []
    })
      .compileComponents();
    let service = TestBed.get(AuctionService)

    let spy = spyOn(service, 'getRunningAuctions').and.callFake(() => {
      return Promise.resolve(JSON.parse(getMockData()))
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsOverviewComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should handle the response from get actions call', async done => {

  //   // component.ngAfterViewInit()
  //   fixture.detectChanges();
  //   let element: ElementRef = fixture.debugElement.query(By.css('.mySlides'));
  //   expect(component.slides.length).toBe(1)
  //   done();
  // });
});

function getMockData(): string {
  return '[{"endingTime":"2020-03-09T10:02:00.620Z","associatedVehicle":{"imageUrls":{"leftSide":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/d3lju1dhl1e4jjfog2iz.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":0,"encoding":null,"mimeType":null},"leftSideBack":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/p8w7esqdb3zr5jrujgnx.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":1,"encoding":null,"mimeType":null},"rightSide":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/pmm5le8kuv3tr6ob9qrc.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":2,"encoding":null,"mimeType":null},"interior":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/qvxsn4cwez8fw8aigsp8.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":3,"encoding":null,"mimeType":null},"front":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326333/eu5dcw9hpeyz2hwvup2t.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":4,"encoding":null,"mimeType":null}}},"images":[{"name":"leftSide","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/d3lju1dhl1e4jjfog2iz.png"},{"name":"leftSideBack","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/p8w7esqdb3zr5jrujgnx.png"},{"name":"rightSide","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/pmm5le8kuv3tr6ob9qrc.png"},{"name":"interior","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/qvxsn4cwez8fw8aigsp8.png"},{"name":"front","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326333/eu5dcw9hpeyz2hwvup2t.png"}],"timeRemaining":"10:2:0"}]'
}
