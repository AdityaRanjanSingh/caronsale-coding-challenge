import { Injectable } from '@angular/core';
import Axios from 'axios';
import { AxiosInstance } from 'axios';
import { API_HOSTNAME, API_PATHS } from '../../constants/api-constants';
import { IAuction } from '../../interfaces/iauction'
import { resolve } from 'dns';
import { rejects } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private client: AxiosInstance = Axios.create({ baseURL: API_HOSTNAME });
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
        let formattedAuctionData = this.formatAuctionData(response.data);
        resolve(formattedAuctionData)
      } catch (e) {
        reject(e)
      }
    })
  }

  formatAuctionData(auctionData: any[]): any[] {
    return auctionData.map(item => {
      const endingTime = new Date(item.endingTime);

      return {
        ...item,
        remainingTime: `${endingTime.getHours()}:${endingTime.getMinutes()}:${endingTime.getSeconds()}`
      }
    })
  }
}
