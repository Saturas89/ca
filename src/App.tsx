import './App.css';
import {BuilderComponent} from '@builder.io/react';
import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {WalletConnect} from "./components/WalletConnect";

function App() {

 /*   const [currentAccount, setCurrentAccount] = useState("");

    async function connectWallet() {
        try {
            // @ts-ignore
            const {ethereum} = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            const accounts = await ethereum.request({method: "eth_requestAccounts"});

            console.log("Connected", accounts[0]);
     //       setCurrentAccount(accounts[0])
            console.log("currentAcc", currentAccount)
            // Setup listener! This is for the case where a user comes to our site
            // and connected their wallet for the first time.
            //     setupEventListener()
        } catch (error) {
            console.log(error)
        }
    } */

    // @ts-ignore
    return (
        <>
            <header>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="/">
                                <img
                                  //  src="/ca-logo.png"
                                  //  src={require('/ca-logo.png')}
                                    src={`${process.env.PUBLIC_URL}/ca-logo.png`}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                           Cryptoacademy</Navbar.Brand>
                        <Nav>
                            <Nav.Link href="/">NFT</Nav.Link>
                            <Nav.Link href="/token">Token</Nav.Link>
                            <Nav.Link href="/member">Member</Nav.Link>
                            <Nav.Link href="/nft">About us</Nav.Link>
                        </Nav>
                        <WalletConnect/>
                    </Container>
                </Navbar>
            </header>
            <div className="App">
                <BuilderComponent model="page"/>
            </div>
        </>
    );


}

export default App;
