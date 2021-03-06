import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";


export function WalletConnect() {
    const [currentAccount, setCurrentAccount] = useState("");


    const checkIfWalletIsConnected = async () => {
        // @ts-ignore
        const {ethereum} = window;

        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account)
            //     setupEventListener()
        } else {
            console.log("No authorized account found")
        }
    }


    const connectWallet = async () => {
        try {
            // @ts-ignore
            const {ethereum} = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            const accounts = await ethereum.request({method: "eth_requestAccounts"});

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);

            // Setup listener! This is for the case where a user comes to our site
            // and connected their wallet for the first time.
            //     setupEventListener()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // @ts-ignore
        checkIfWalletIsConnected().then(r => console.log("checkIfWallet"));
    }, [currentAccount])

    return <>
        {!currentAccount ? (
                <Button variant="outlined" type="submit" onClick={connectWallet}>Connect
                    Wallet
                </Button>
            ) :
            (<Button variant="outlined" disabled>Connected
            </Button>)
        }
    </>
}
