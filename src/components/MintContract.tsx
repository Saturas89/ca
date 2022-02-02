import React from "react";
import {ethers} from "ethers";
import memberNFT from '../utils/MemberNFT.json';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from "@mui/icons-material/Send";
import {pinJSONToIPFS} from '../pinata'
import {TextField} from "@mui/material";


export function MintContract() {

    const [loading, setLoading] = React.useState(false);

    // @ts-ignore
    const mintNFT = async () => {
        setLoading(true)
        //make metadata
        const metadata = new Metadata();
        metadata.name = (document.getElementById("nft-name") as HTMLInputElement).value.trim();
        metadata.image = (document.getElementById("nft-asset-link") as HTMLInputElement).value.trim();
        metadata.description = (document.getElementById("nft-description") as HTMLInputElement).value.trim();

        //error handling
        if (metadata.name === "" || (metadata.image === "" || metadata.description === "")) {
            alert("❗Please make sure all fields are completed before minting.")
            return {
                success: false,
                status: "❗Please make sure all fields are completed before minting.",
            }
        }

        //make pinata call
        const pinataResponse = await pinJSONToIPFS(metadata);
        if (!pinataResponse.success) {
            return {
                success: false,
                status: "😢 Something went wrong while uploading your tokenURI.",
            }
        }

        const tokenURI = pinataResponse.pinataUrl;

        const CONTRACT_ADDRESS = "0xf7734122eADa7a13dE4d35aEb4d6376010eB8958";
        try {
            // @ts-ignore
            const {ethereum} = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                console.log("tokenuri " + tokenURI)
                const connectedContract = await new ethers.Contract(CONTRACT_ADDRESS, memberNFT.abi, signer);
                // "https://gateway.pinata.cloud/ipfs/QmYaSb6mSrnoC1x7xP5xCmkmBDZ2gJ7kcbYqkuhF2Dgh2J"
                console.log("Going to pop wallet now to pay gas...")
                // @ts-ignore
                let nftTxn = await connectedContract.mintNFT(document.getElementById('recipient').value, tokenURI);
                console.log("Mining...please wait.")
                alert("Mining...please wait.")
                await nftTxn.wait();
                alert(`Successfully https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
                setLoading(false)
            } else {
                console.log("Ethereum object doesn't exist!");
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    return <>
        <TextField
            id="nft-name"
            label="NFT Name"
            placeholder="e.g. Cryptoacademy 2018"
        />
        <br/>
        <TextField
            id="nft-asset-link"
            label="Link to picture/asset"
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/QmYhrjZXbJQSYJ8VcFDLBPVNUd5AcNRh2khcL6TXRtmd1R?preview=1"
        />
        <br/>
        <TextField
            id="nft-description"
            label="NFT Description"
            placeholder="e.g. Even cooler than cryptokitties or bored ape yacht club ;)"
        />
        <LoadingButton variant="contained" onClick={() => mintNFT()} endIcon={<SendIcon/>} loading={loading}
                       loadingPosition="end">send</LoadingButton>
    </>
}

class Metadata {
    name: string | undefined;
    image: string | undefined;
    description: string | undefined
}





