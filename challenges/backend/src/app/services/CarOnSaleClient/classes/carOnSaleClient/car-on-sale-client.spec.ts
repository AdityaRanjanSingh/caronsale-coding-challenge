import { expect } from 'chai';
import Axios from 'axios'
import 'mocha';
import sinon from 'sinon';
import { CarOnSaleClient } from './index'
import { Constants } from '../../../../constants/constants'
import { AuthToken } from '../authToken/index'
describe('Test Car on car on sale module', () => {

    it('should call axios get request to get running auctions with correct params', async () => {
        const token = {
            userId: "userId",
            token: 'Token',
            internalUserId: 0,
            authenticated: true,
            internalUserUUID: 'internalUserUUID',
            privileges: "privileges",
            type: "type"
        }
        const authTokenStub = sinon.stub(AuthToken.prototype, 'getAuthToken').callsFake(() => token);

        const getSpy = sinon.spy();
        const axiosStub = sinon.stub(Axios, 'create').callsFake(() => {
            return {
                get: (path, param) => {
                    expect(path).equal(Constants.BUYER_AUCTIONS_PATH);
                    expect(param).to.deep.equal({ headers: { "userid": "userId", "authtoken": "Token" } });
                    return { data: { items: [] } }
                }
            }
        });
        const carOnSaleClient = new CarOnSaleClient();

        const auctions = await carOnSaleClient.getRunningAuctions()

        axiosStub.restore();
        authTokenStub.restore();
    });
    it('should handle response from axios get response', async () => {
        const token = {
            userId: "userId",
            token: 'Token',
            internalUserId: 0,
            authenticated: true,
            internalUserUUID: 'internalUserUUID',
            privileges: "privileges",
            type: "type"
        }
        const authTokenStub = sinon.stub(AuthToken.prototype, 'getAuthToken').callsFake(() => token);
        const dataToReturn = [{ numBids: 1, minimumRequiredAsk: 123, currentHighestBidValue: 3432 },
        { numBids: 2, minimumRequiredAsk: 2, currentHighestBidValue: 1 }]
        const getSpy = sinon.spy();
        const axiosStub = sinon.stub(Axios, 'create').callsFake(() => {
            return {
                get: (path, param) => {
                    return { data: { items: dataToReturn } }
                }
            }
        });
        const carOnSaleClient = new CarOnSaleClient();
        const auctions = await carOnSaleClient.getRunningAuctions()
        expect(auctions).to.deep.equal(dataToReturn)

        axiosStub.restore();
        authTokenStub.restore();
    })
})
