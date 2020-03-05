import { Injectable } from '@angular/core';
import { API_HOSTNAME, HASH_CYCLES, API_PATHS } from '../../constants/api-constants'
import Axios from 'axios';
import { AxiosInstance } from 'axios';
import hasha from 'hasha';
import { rejects } from 'assert';
import { IAuthToken } from '../../interfaces/iauth-token'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token: IAuthToken;
  public client: AxiosInstance = Axios.create({ baseURL: API_HOSTNAME });
  constructor() { }
  public async login(userEmail: string, userPassword: string): Promise<IAuthToken> {
    return new Promise(async (resolve, reject) => {
      try {
        let hashedPassword: string = await this.hashPassword(userPassword, HASH_CYCLES);
        let response: any = await this.client.put(`${API_PATHS.authentication}${userEmail}`, { password: hashedPassword });
        resolve(response.data);
      } catch (e) {
        reject(e)
      }
    })
  }
  public async setSessionData(data) {
    for (let key in data) {
      sessionStorage.setItem(key, data[key]);
    }
  }
  private async hashPassword(userPassword: string, cycles: number) {
    let hash = userPassword;
    for (let i = 1; i <= cycles; i++) {
      hash = await hasha(hash);
    }
    return hash;
  }
}
