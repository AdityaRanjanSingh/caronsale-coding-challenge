import { Injectable } from '@angular/core';
import Axios from 'axios';
import { AxiosInstance } from 'axios';
import { API_HOSTNAME, API_PATHS } from '../../constants/api-constants';
@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  public client: AxiosInstance = Axios.create({ baseURL: API_HOSTNAME });
  constructor() { }
  async getRunningAuctions(): Promise<any[]> {
    const userid = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token')
    const headers = {
      "userid": userid,
      "authtoken": token
    }
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.client.get(API_PATHS.auctions, { headers });
        let formattedAuctionData = this.formatAuctionData(response.data.items);
        resolve(formattedAuctionData)
      } catch (e) {
        reject(e)
      }
    })
  }

  formatAuctionData(auctionData: any[]): any[] {
    return auctionData.map(item => {
      const endingTime = new Date(item.endingTime);
      let images = [];
      let imageUrls = item.associatedVehicle.imageUrls
      for (let key in imageUrls) {
        if (imageUrls[key]) {
          images.push({
            name: key,
            url: imageUrls[key]['url']
          })

        }

      }
      return {
        ...item,
        images,
        timeRemaining: `${endingTime.getHours()}:${endingTime.getMinutes()}:${endingTime.getSeconds()}`
      }
    })
  }
}
