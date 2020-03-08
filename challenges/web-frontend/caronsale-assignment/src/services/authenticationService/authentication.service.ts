import { Injectable } from '@angular/core';
import { API_HOSTNAME, HASH_CYCLES, API_PATHS } from '../../constants/api-constants'
import Axios from 'axios';
import { AxiosInstance } from 'axios';
import { sha512 } from 'js-sha512';
import { IAuthToken } from '../../interfaces/iauth-token'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token: IAuthToken;
  public client: AxiosInstance = Axios.create({ baseURL: API_HOSTNAME });

  constructor() { }
  public async login(userEmail: string, userPassword: string): Promise<IAuthToken> {
    console.log(this.client, "\n\n\n")
    return new Promise(async (resolve, reject) => {
      try {
        let hashedPassword: string = await this.hashPassword(userPassword, HASH_CYCLES);
        let response: any = await this.client.put(`${API_PATHS.authentication}${userEmail}`, { password: hashedPassword, "meta": "string" });
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
  private hashPassword(password: string, cycles: number) {
    let hash = password;
    for (let i = 0; i < cycles; i++) {
      hash = sha512(hash);
    }
    return hash;
  }
}
