import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//internal import
import { ERC20ICOContext } from "../context/HazzyToken";

const Home = () => {
  const { HazzyToken } = useContext(ERC20ICOContext);
  return <div>{HazzyToken} </div>;
};

export default Home;
