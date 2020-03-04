/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
import { IAuction } from '../interface/IAuction'
export interface ICarOnSaleClient {

    getRunningAuctions(): Promise<IAuction[]/* TODO: Introduce a type */>

}