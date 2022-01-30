import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { builder, Builder } from '@builder.io/sdk';
import { SourceCodeLink } from './components/SourceCodeLink';
import { ShoesViewer } from './components/ShoesViewer';
import { Header } from './components/Header';
import { WalletConnect } from './components/WalletConnect';
import { MintContract } from './components/MintContract';
import { Nft } from './components/Nft';
import {BuilderComponent, withChildren} from '@builder.io/react';
import {Auth0Provider} from "@auth0/auth0-react";
import {EthAddress} from "./components/EthAddress";
import {LinkToAsset} from "./components/LinkToAsset";

builder.init("caf72d82937b47ce891866e56a3aec0f");

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
        domain='dev-6khuzb2c.us.auth0.com'
        clientId='dL1TqNaim14CMAs2k7dht2FJwxbRuPck'
        redirect_uri={window.location.origin}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default () => (
    <BuilderComponent
        context={{
          myFunction: () => alert('Hi!')
        }}
    />
);

Builder.registerComponent(EthAddress, {
  name: "EthAddress",
});

Builder.registerComponent(MintContract, {
  name: "MintContract",
});

 Builder.registerComponent(Nft, {
  name: "NFT",
});

Builder.registerComponent(LinkToAsset, {
  name: "LinkToAsset",
});


/* Builder.registerComponent(WalletConnect, {
  name: "WalletConnect",
}); */

// Register Header component so it's available in the drag-and-drop tool
Builder.registerComponent(Header, {
  name: "Header",
  inputs: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "subtitle",
      type: "string",
    },
  ],
});

// Register ModelView component as dragable component in the builder editor
Builder.registerComponent(ShoesViewer, {
  name: "Shoes",
  inputs: [
    {
      name: 'nuShoes',
      type: 'number',
      friendlyName: 'Number of shoes',
      defaultValue: 5,
    },
    {
      name: 'ambientLight',
      type: 'number',
      friendlyName: 'Ambient light intensity',
      defaultValue: 0.5,
    }
  ]
});


Builder.registerComponent(withChildren(SourceCodeLink), {
  name: "SourceCodeLink",
  inputs: [
    {
      name: 'fileName',
      type: 'string',
      required: true,
    },
    {
      name: 'line',
      type: 'number',
    },
    {
      name: 'column',
      type: 'number',
    },
  ],
  canHaveChildren: true,
  defaultChildren: [
    {
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Text', options: { text: 'Open source code' } }
    }
  ]
});
