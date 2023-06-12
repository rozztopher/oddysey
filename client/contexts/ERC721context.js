import React, { Component } from "react";
import * as erc721ABI from "../utils/erc721ABI.json";
import Web3 from "web3";
import ServerClient from "../utils/ServerClient";
import { openMintModal } from "../utils/Common";
const ERC721context = React.createContext();

class ERC721Provider extends Component {
  state = {
    erc721: {},
  };

  /**
   * Sets the contract object so that contract
   * functions can be used throughout the app
   * @param {*} web3 A web3 provider
   */
  initialiseERC721Contract = () => {
    const provider = window.ethereum;
    const web3 = new Web3(provider);
    const erc721Contract = new web3.eth.Contract(
      erc721ABI.default,
      "0xEcd9837673D4c10f5D61a3e7b81C12AefA0B472B"
    );
    this.setState({ erc721: erc721Contract });
  };

  allowlistMintingAllowed = async () => {
    const bool = await this.state.erc721.methods
      .allowlistMintingAllowed()
      .call();
    return bool;
  };

  waitlistMintingAllowed = async () => {
    const bool = await this.state.erc721.methods
      .waitlistMintingAllowed()
      .call();
    return bool;
  };

  balanceOf = async (address) => {
    const balance = await this.state.erc721.methods.balanceOf(address).call();
    return balance;
  };

  mintingAllowed = async () => {
    const bool = await this.state.erc721.methods.mintingAllowed().call();
    return bool;
  };

  getAlienCoefficient = async () => {
    const bool = await this.state.erc721.methods.getAlienCoefficient().call();
    return bool;
  };

  ownerOf = async (token) => {
    const owner = await this.state.erc721.methods.ownerOf(token).call();
    return owner;
  };

  tokenURI = async (token) => {
    const owner = await this.state.erc721.methods.tokenURI(token).call();
    return owner;
  };

  totalTokensMinted = async () => {
    const owner = await this.state.erc721.methods.totalTokensMinted().call();
    return owner;
  };

  mint = async (address) => {
    const allowlistMinting = await this.allowlistMintingAllowed();
    const minting = await this.mintingAllowed();
    if (allowlistMinting && minting) {
      openMintModal("Minting is not active", false, "Failure", false);
    } else if (allowlistMinting) {
      this.towerPreMint(address);
    } else if (minting) {
      this.towerMint(address);
    } else {
      openMintModal("Minting is not active", false, "Failure", false);
    }
  };

  towerPreMint = async (address) => {
    const coefficient = await this.getAlienCoefficient();
    const list = coefficient ? "waitlist" : "allowlist";
    const tree = coefficient ? "/api/iswaitinglist" : "api/isallowlist";
    const res = await ServerClient.post(
      tree,
      { add: address },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const proof = res.data.data.hexproof;
    if (proof.length > 0) {
      const balance = await this.balanceOf(address);
      if (balance >= 1) {
        openMintModal("You have already minted", false, "Failure", false);
      } else {
        openMintModal("Minting, do not leave the page", true, null, false);
        this.state.erc721.methods
          .towerPreMint(proof)
          .send({
            from: address,
            value: 0,
          })
          .then((res) => {
            const link = document.getElementById("modal-link");
            const root = res.to;
            const token = res.events.Transfer.returnValues.tokenId;
            link.href = `https://opensea.io/assets/goerli/${root}/${token}`;
            link.target = "_blank";
            openMintModal("Go to OpenSea", true, "Success", true);
            window.dispatchEvent(new Event("mintsuccess"));
          });
      }
    } else {
      openMintModal(`You are not on the ${list}`, false, "Failure", false);
    }
  };

  towerMint = async (address) => {
    const balance = await this.balanceOf(address);
    if (balance >= 1) {
      openMintModal("You have already minted", false, "Failure", false);
    } else {
      openMintModal("Minting, do not leave the page", true, null, false);
      this.state.erc721.methods
        .towerMint()
        .send({
          from: address,
          value: 0,
        })
        .then((res) => {
          const link = document.getElementById("modal-link");
          const root = res.to;
          const token = res.events.Transfer.returnValues.tokenId;
          link.href = `https://opensea.io/assets/goerli/${root}/${token}`;
          link.target = "_blank";
          openMintModal("Go to OpenSea", true, "Success", true);
          window.dispatchEvent(new Event("mintsuccess"));
          console.log(res);
        });
    }
  };

  /**
   * Provides the variables and functions that can be
   * used in any component throughout the app
   * @returns the STATE
   */
  render() {
    return (
      <ERC721context.Provider
        value={{
          erc721: this.state.erc721,
          initContract: this.initialiseERC721Contract,
          mintingAllowed: this.mintingAllowed,
          ownerOf: this.ownerOf,
          tokenURI: this.tokenURI,
          totalTokensMinted: this.totalTokensMinted,
          mint: this.mint,
          allowlistMintingAllowed: this.allowlistMintingAllowed,
          waitlistMintingAllowed: this.waitlistMintingAllowed,
          getAlienCoefficient: this.getAlienCoefficient
        }}
      >
        {this.props.children}
      </ERC721context.Provider>
    );
  }
}

const ERC721consumer = ERC721context.Consumer;

export { ERC721consumer, ERC721context };

export default ERC721Provider;
