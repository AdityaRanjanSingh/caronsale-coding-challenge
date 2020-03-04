
import Axios from 'axios';
import hasha from 'hasha';
import { Token } from '../../interface/IToken'
import { Constants } from '../../../../constants/constants'
import { injectable } from "inversify";
import "reflect-metadata";
@injectable()
export class AuthToken {

    public client = Axios.create({ baseURL: Constants.BASE_URL });
    public token: Token;

    public async getAuthToken(): Promise<Token> {
        if (!this.token) {
            const response: any = await this.createNewAuthToken();
            this.token = response.data
        } else {
            const response = await this.refreshAuthToken(this.token);
            this.token = response.data
        }
        return this.token;
    }

    public async createNewAuthToken(): Promise<Token> {
        const encryptedPass = await this.hashPassword(Constants.USER_PASSWORD, 5);
        return await this.client.put(`${Constants.AUTHENTICATION_PATH}${Constants.USER_EMAIL_ID}`, { password: encryptedPass })
    }

    public async refreshAuthToken(authData): Promise<any> {
        return await this.client.post(`${Constants.AUTHENTICATION_PATH}${Constants.USER_EMAIL_ID}`, authData)
    }

    private async hashPassword(password: string, cycles: number): Promise<string> {
        let hash = password;
        for (let i = 1; i <= cycles; i++) {
            hash = await hasha(hash);
        }
        return hash;
    }
}