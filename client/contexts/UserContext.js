import React, { Component } from "react";
const Web3 = require("web3");
import ServerClient from "../utils/ServerClient";
import gsap from "gsap";

const UserContext = React.createContext();

/**
 * This is the context that holds all information about
 * a logged in user and also stores the functions and
 * contracts from web3
 */
class UserProvider extends Component {
  state = {
    user: {},
    status: "Unconnected",
  };

  /**
   * sets a logged in user to the app context
   * @param {*} newUser the user object to set
   */
  setUser = async (newUser) => {
    this.setState({ user: newUser });
    this.getBalance(newUser);
  };

  createUser = async (address) => {
    const res = await ServerClient.post(
      "api/isallowlist",
      { add: address },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res2 = await ServerClient.post(
      "api/iswaitinglist",
      { add: address },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const proof = res.data.data.hexproof;
    const proof2 = res2.data.data.hexproof;
    if (proof.length > 0) this.setState({ status: "Allowlisted" });
    else if (proof2.length > 0) this.setState({ status: "Waitlisted" });
    else this.setState({ status: "Public Minter" });
    gsap.to(".mobile-menu", { duration: 1, left: "100vw" });
    this.setState({ user: { walletAddress: address } });
  };

  /**
   * Connects the metamask wallet
   */
  connectMetamask = async () => {
    const provider = window.ethereum;
    if (typeof provider !== undefined) {
      provider
        .request({ method: "eth_requestAccounts" })
        .then(async (accounts) => {
          this.createUser(accounts[0]);
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: "0x1" }],
          });
        })
        .catch((err) => {
          console.log(err);
          return;
        });
      window.ethereum.on("accountsChanged", (accounts) => {
        this.createUser(accounts[0]);
      });
    } else {
      alert("Please install wallet");
    }
  };

  /**
   * Provides the variables and functions that can be
   * used in any component throughout the app
   * @returns the STATE
   */
  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          status: this.state.status,
          connectMetamask: this.connectMetamask,
          setUser: this.setUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserConsumer, UserContext };

export default UserProvider;
