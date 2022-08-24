import React, { useState, useEffect, useContext } from "React";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// internal imports
import { hazzyTokenAddress, hazzyTokenABI } from "./constants";

const fetchContractERC20 = (signerOrProvider) =>
  new ethers.Contract(hazzyTokenAddress, hazzyTokenABI, signerOrProvider);

export const ERC20ICOContext = React.createContext();

export const ERC20Provider = ({ children }) => {
  //---USER ACCOUNT
  const [holderArray, setHolderArray] = useState([]);
  const [account, setAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [userId, setUserId] = useState("");

  //----TOKEN INFO
  const [NoOfToken, setNOofToken] = useState("");
  const [TokenName, setTokenName] = useState("");
  const [TokenStandard, setTokenStandard] = useState("");
  const [TokenSymbol, setTokenSymbol] = useState("");
  const [TokenOwner, setTokenOwner] = useState("");
  const [TokenOwnerBal, setTokenOwnerBal] = useState("");

  //-----CONNECTING WALLET TO APPLICATION
  const checkConnection = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");
      const account = await window.ethereum.request({
        metyhod: "eth_accounts",
      });
      setAccount(account[0]);

      //----CREATING CONNECTION TO CONTRACT AND FETCH DATA
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      //----- GET ALL TOKEN HOLDERS
      const allTokenHolders = await contract.balanceOf(account[0]);
      setAccountBalance(allTokenHolders.toNumber());

      const totalHolder = await contract._userId();
      setUserId(totalHolder.toNumber());

      //----CATCH ERROR
    } catch (error) {
      console.log("App not connected");
    }
  };

  //----CONNECTED WITH TOKEN CONTRACT
  const ERCHazzyToken = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer =
        provider.getSigner(0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266);
      const contract = fetchContractERC20(signer);

      //----TOKEN SUPPLY
      const supply = await contract.totalSupply();
      const totalSupply = supply.toNumber();
      setNOofToken(totalSupply);

      //-----TOKEN NAME
      const name = await contract.name();
      setTokenName(name);

      //-----TOKEN SYMBOL
      const symbol = await contract.symbol();
      setTokenSymbol(symbol);

      //-----TOKEN STANDARD
      const standard = await contract.standard();
      setTokenStandard(standard);

      //-----TOKEN OWNER CONTRACT
      const ownerOfContract = await contract.ownerOfContract();
      setTokenOwner(ownerOfContract);

      //-----OWNER TOKEN BALANCE
      const balanceToken = await contract.balanceOf(
        0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
      );
      setTokenOwnerBal(balanceToken.toNumber());

      //------
    } catch (error) {
      console.log("Something went wrong in the Token function");
    }
  };

  //----TOKEN RTANSFER

  const transferToken = async (address, value) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchFunTokenContract(signer);

      const transfer = await contract.transfer(address, BigInt(value * 1));

      transfer.wait();

      // myLoader();
      window.location.reload();
    } catch (error) {
      console.log("something went worng transfering token");
    }
  };

  //----GET TOKEN HOLDER DATA

  const tokenHolderData = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchFunTokenContract(signer);

      const allTokenHolder = await contract.getTokenHolder();

      allTokenHolder.map(async (el) => {
        const singleHolderData = await contract.getTokenHolderData(el);
        holderArray.push(singleHolderData);
        console.log(holderArray);
      });
    } catch (error) {
      console.log("Worng getting data");
    }
  };

  return (
    <ERC20ICOContext.Provider
      value={{
        checkConnection,
        ERCHazzyToken,
        transferToken,
        tokenHolderData,
        holderArray,
        NoOfToken,
        TokenName,
        TokenStandard,
        TokenSymbol,
        TokenOwner,
        account,
        accountBalance,
        TokenOwnerBal,
        userId,
      }}
    >
      {children}
    </ERC20ICOContext.Provider>
  );
};
