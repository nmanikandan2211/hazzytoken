import React, { useState, useEffect, useContext } from "React";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// internal imports
import { funTokenAddress, funTokenABI } from "./constants";

const fetchContractERC20 = (signerOrProvider) =>
  new ethers.Contract(funTokenAddress, funTokenABI, signerOrProvider);

export const ERC20ICOContext = React.createContext();

export const ERC20Provider = ({ children }) => {
  const test = "manikandan";

  //---USER ACCOUNT
  const [holderArray, setholderArray] = useState([]);
  const [account, setaccount] = useState('');
  const [accountBalance, setaccountBalance] = useState('');
  const [userId, setuserId] = useState('');

//----TOKEN INFO


  return (
    <ERC20ICOContext.Provider value={{}}>{children}</ERC20ICOContext.Provider>
  );
};
