const { ThirdwebSDK, IpfsStorage } = require('@thirdweb-dev/sdk');
const { ethers } = require('ethers');

const wallet = new ethers.Wallet(
    //cambia a .env cuando termines
    "4a8a6e668b7c9b7479c4b87df498395b77f3cba94f1e555fe5db6a58becb500e",
    new ethers.providers.InfuraProvider("maticmum", "07c30260886b4a49a59f4684e30ea5be")
)

const sdk = new ThirdwebSDK(wallet)

const nft = sdk.getNFTCollection("0xBADb40d04e7C2037a76955590A1a1CB8Aa1003A1")
module.exports = {
    wallet,
    nft
}