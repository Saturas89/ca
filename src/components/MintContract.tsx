import React from "react";
import {ethers} from "ethers";
import memberNFT from '../utils/MemberNFT.json';
import {EthAddress} from "./EthAddress";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {pinJSONToIPFS} from '../pinata'

export function MintContract() {
    const CONTRACT_ADDRESS = "0xf7734122eADa7a13dE4d35aEb4d6376010eB8958";
    const askContractToMintNft = async () => {
        try {
            // @ts-ignore
            const {ethereum} = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const connectedContract = await new ethers.Contract(CONTRACT_ADDRESS, memberNFT.abi, signer);

                console.log("Going to pop wallet now to pay gas...")
                // @ts-ignore
                let nftTxn = await connectedContract.mintNFT(document.getElementById('recipient').value, "https://gateway.pinata.cloud/ipfs/QmYaSb6mSrnoC1x7xP5xCmkmBDZ2gJ7kcbYqkuhF2Dgh2J");

                console.log("Mining...please wait.")
                await nftTxn.wait();

                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }


    //    <input id="recipient" placeholder="0xDe91...." type="text"/>
    //      <input type="submit" onClick={askContractToMintNft} value="send"
    //            className="cta-button connect-wallet-button"/>
    return <>
        <Button variant="contained" onClick={askContractToMintNft} endIcon={<SendIcon />}>send</Button>
    </>
}

export const mintNFT = async(url, name, description) => {
    //error handling
    if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) {
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
    }
}