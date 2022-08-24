import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//internal import
import { ERC20ICOContext } from "../context/HazzyToken";

const Home = () => {
  const {
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
  } = useContext(ERC20ICOContext);

  useEffect(() => {
    checkConnection();
    tokenHolderData();
  }, []);

  return <div>Home </div>;
};

export default Home;
