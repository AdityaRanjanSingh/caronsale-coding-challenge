import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { formatBuyerAuctionData } from './utils/formatBuyerAuctionData/index'
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { IAuction } from "./services/CarOnSaleClient/interface/IAuction";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);

        // Get running auctions
        try {
            const runningAuctions: IAuction[] = await this.carOnSaleClient.getRunningAuctions();

            const processedAuctions = await formatBuyerAuctionData(runningAuctions)
            this.logger.log(`
            avgNumOfBids =  ${processedAuctions.avgNumOfBids}
            numOfAuctions =  ${processedAuctions.numOfAuctions}
            avgPerAuctionProgress =  ${processedAuctions.avgPerAuctionProgress}
            `)
            process.exit(0)
        } catch (error) {
            this.logger.log(`${error}`)

            process.exit(1)
        }

    }

}