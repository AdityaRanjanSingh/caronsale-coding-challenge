import { expect } from 'chai';
import Axios from 'axios'
import 'mocha';
import sinon from 'sinon';
import { AuthToken } from './index'
import { Constants } from '../../../../constants/constants'
let axiosMock;
describe('Test Auth Token module', () => {
    beforeEach(() => {
        axiosMock = sinon.mock(Axios);
    })
    afterEach(() => {
        axiosMock.restore();
    })
    it('should call axios put to create auth token for new request', async () => {
        const axiosStub = sinon.stub(Axios, 'create').callsFake(() => {
            return {
                put: (param, param1) => {
                    expect(param).equal(`${Constants.AUTHENTICATION_PATH}${Constants.USER_EMAIL_ID}`);
                    return { data: {} }
                }
            }
        })

        const authToken = new AuthToken();
        const token = await authToken.getAuthToken();
        axiosStub.restore();

    });
    it('should call axios post to refresh auth token ', async () => {
        const token = {
            userId: Constants.USER_EMAIL_ID,
            token: 'Token',
            internalUserId: 0,
            authenticated: true,
            internalUserUUID: 'internalUserUUID',
            privileges: "privileges",
            type: "type"
        }
        const axiosStub = sinon.stub(Axios, 'create').callsFake(() => {
            return {
                post: (param, param1) => {
                    expect(param).equal(`${Constants.AUTHENTICATION_PATH}${Constants.USER_EMAIL_ID}`)
                    expect(param1).equal(token)
                    return { data: {} }
                }
            }
        })
        const authToken = new AuthToken();

        authToken.token = token;
        const responseToken = await authToken.getAuthToken();
        axiosStub.restore();

    })
})
