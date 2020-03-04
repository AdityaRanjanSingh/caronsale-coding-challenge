export interface Token {
    "authenticated": boolean,
    "userId": string,
    "internalUserId": number,
    "internalUserUUID": string,
    "token": string,
    "type": string,
    "privileges": string
}