
import { ICarOnSaleClient } from '../../interface/ICarOnSaleClient'
import { AuthToken } from '../authToken/index'
import { Constants } from '../../../../constants/constants'
import Axios from 'axios'
import { Token } from '../../interface/IToken'
import { IAuction } from '../../interface/IAuction'
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    public async getRunningAuctions(): Promise<IAuction[]> {
        const client = Axios.create({ baseURL: Constants.BASE_URL });
        const authToken = new AuthToken();
        const token: Token = await authToken.getAuthToken();
        const headers = {
            "userid": token.userId,
            "authtoken": token.token
        }
        const response: any = await client.get(Constants.BUYER_AUCTIONS_PATH, { headers });

        return response.data.items.map(item => {
            return {
                numBids: item.numBids,
                minimumRequiredAsk: item.minimumRequiredAsk,
                currentHighestBidValue: item.currentHighestBidValue
            }
        })
    }
}