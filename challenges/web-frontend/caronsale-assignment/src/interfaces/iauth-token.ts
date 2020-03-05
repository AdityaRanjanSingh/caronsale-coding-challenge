export interface IAuthToken {
    token: string,
    authenticated: boolean,
    userId: string,
    internalUserId: number,
    internalUserUUID: string,
    type: 1,
    privileges: string
}
