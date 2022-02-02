import './App.css';
import {BuilderComponent} from '@builder.io/react';
import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {WalletConnect} from "./components/WalletConnect";

function App() {


    return (
        <>
            <header>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="/">
                                <img
                                    src={`${process.env.PUBLIC_URL}/ca-logo.png`}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                           Cryptoacademy</Navbar.Brand>
                        <Nav>
                            <Nav.Link href="/">NFT</Nav.Link>
                            <Nav.Link href="/">Token</Nav.Link>
                            <Nav.Link href="/">Member</Nav.Link>
                            <Nav.Link href="/">About us</Nav.Link>
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
