const { ThirdwebSDK, IpfsStorage } = require("@thirdweb-dev/sdk");
const { ethers } = require("ethers");
const FormData = require("form-data");
const fs = require("fs");
var http = require("http"),
    fileSystem = require("fs"),
    path = require("path");
const { wallet, nft } = require("../../helpers/nftMusic");
const { MusicModel } = require("../models");
const { sendResponse, sendError } = require("../utils/response");
util = require("util");

const addNFT = async (req, res) => {
    try {
        var pathMusic = path.resolve(__dirname, "../../uploads/file.mp3");
        var imagenPath = path.resolve(__dirname, "../../uploads/image.png");

        const musicrepeated = await MusicModel.findOne({ name: req.body.title });
        if (musicrepeated) {
            return res.status(404).json(sendError("this music do exist, verify your data"));
        }

        const pathmp3 = fs.readFileSync(pathMusic);
        const pathimg = fs.readFileSync(imagenPath);

        const nftData = {
            name: req.body.title,
            animation_url: pathmp3,
            image: pathimg,
        };

        const mintnft = await nft.mintTo(
            "0x2881F0282106B331fCCe58D3D39bc7df643F6355",
            nftData
        );


        const allnft = await nft.getAll();
        const openSeaLink = `https://testnets.opensea.io/assets/mumbai/${mintnft.receipt.to
            }/${allnft.length - 1}`;

        const findMintedNFt = await nft.get(mintnft.id._hex);

        const music = await MusicModel.create({
            artist: req.body.artist,
            name: req.body.title,
            genere: req.body.genre,
            file: findMintedNFt.metadata.animation_url,
            img: findMintedNFt.metadata.image,
            openseaLink: openSeaLink,
        });
        res.json(sendResponse(music));

    } catch (error) {

    }

};

module.exports = {
    addNFT,
};
