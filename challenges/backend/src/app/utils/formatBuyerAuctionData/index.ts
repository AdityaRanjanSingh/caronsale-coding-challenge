import { IAuction } from '../../services/CarOnSaleClient/interface/IAuction'

export async function formatBuyerAuctionData(auctionData: IAuction[]) {
    let totalBids: number = 0;
    let totalAuctionProgress: number = 0;

    auctionData.forEach(item => {
        totalBids += item.numBids;
        totalAuctionProgress += item.currentHighestBidValue / item.minimumRequiredAsk;
    });

    return {
        numOfAuctions: auctionData.length,
        avgNumOfBids: totalBids / auctionData.length,
        avgPerAuctionProgress: Number(totalAuctionProgress / auctionData.length).toFixed(2)
    }
}