import { TestBed } from '@angular/core/testing';
import { AuctionService } from './auction.service';

describe('AuctionService', () => {
  let service: AuctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should handle request for auctions and format auction data', async () => {
    spyOn(service.client, 'get').and.callFake((): Promise<any> => {
      return Promise.resolve({
        data: {
          items: [{
            endingTime: '2020-03-09T10:02:00.620Z',
            associatedVehicle: {
              imageUrls: { "leftSide": { "rawData": null, "url": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/d3lju1dhl1e4jjfog2iz.png", "_fk_associatedVehicle": 6682, "_fk_uuid_vehicle": "f33d3a9b-8ed7-48e6-860b-423fa15a4076", "perspective": 0, "encoding": null, "mimeType": null }, "leftSideBack": { "rawData": null, "url": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/p8w7esqdb3zr5jrujgnx.png", "_fk_associatedVehicle": 6682, "_fk_uuid_vehicle": "f33d3a9b-8ed7-48e6-860b-423fa15a4076", "perspective": 1, "encoding": null, "mimeType": null }, "rightSide": { "rawData": null, "url": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/pmm5le8kuv3tr6ob9qrc.png", "_fk_associatedVehicle": 6682, "_fk_uuid_vehicle": "f33d3a9b-8ed7-48e6-860b-423fa15a4076", "perspective": 2, "encoding": null, "mimeType": null }, "interior": { "rawData": null, "url": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/qvxsn4cwez8fw8aigsp8.png", "_fk_associatedVehicle": 6682, "_fk_uuid_vehicle": "f33d3a9b-8ed7-48e6-860b-423fa15a4076", "perspective": 3, "encoding": null, "mimeType": null }, "front": { "rawData": null, "url": "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326333/eu5dcw9hpeyz2hwvup2t.png", "_fk_associatedVehicle": 6682, "_fk_uuid_vehicle": "f33d3a9b-8ed7-48e6-860b-423fa15a4076", "perspective": 4, "encoding": null, "mimeType": null } }
            }
          }
          ]
        }
      })
    })
    spyOn(sessionStorage, 'getItem').and.returnValue('somevalue')
    let auctionData = await service.getRunningAuctions();
    expect(JSON.stringify(auctionData)).toBe('[{"endingTime":"2020-03-09T10:02:00.620Z","associatedVehicle":{"imageUrls":{"leftSide":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/d3lju1dhl1e4jjfog2iz.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":0,"encoding":null,"mimeType":null},"leftSideBack":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/p8w7esqdb3zr5jrujgnx.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":1,"encoding":null,"mimeType":null},"rightSide":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/pmm5le8kuv3tr6ob9qrc.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":2,"encoding":null,"mimeType":null},"interior":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/qvxsn4cwez8fw8aigsp8.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":3,"encoding":null,"mimeType":null},"front":{"rawData":null,"url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326333/eu5dcw9hpeyz2hwvup2t.png","_fk_associatedVehicle":6682,"_fk_uuid_vehicle":"f33d3a9b-8ed7-48e6-860b-423fa15a4076","perspective":4,"encoding":null,"mimeType":null}}},"images":[{"name":"leftSide","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/d3lju1dhl1e4jjfog2iz.png"},{"name":"leftSideBack","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/p8w7esqdb3zr5jrujgnx.png"},{"name":"rightSide","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/pmm5le8kuv3tr6ob9qrc.png"},{"name":"interior","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326332/qvxsn4cwez8fw8aigsp8.png"},{"name":"front","url":"https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1583326333/eu5dcw9hpeyz2hwvup2t.png"}],"timeRemaining":"10:2:0"}]')
  });
  it('should handle error for auctions ', async () => {
    spyOn(service.client, 'get').and.callFake((): Promise<any> => {
      return Promise.reject('error')
    })
    spyOn(sessionStorage, 'getItem').and.returnValue('somevalue')
    try {
      let auctionData = await service.getRunningAuctions();

    } catch (e) {
      expect(e).toBe('error')
    }
  });
});
