import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//internal import
import { ERC20ICOContext } from "../context/HazzyToken";
import Style from "../styles/index.module.css";
import banner from "../assets/home-banner.png";
import funToken from "../assets/funToken.png";
import User from "../components/User/User";
import Transfer from "../components/Transfer/Transfer";

const Home = () => {
  const [myAccount, setMyAccount] = useState("");
  const [ammount, setAmmount] = useState(0);
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
    ERCHazzyToken();
  }, []);

  return (
    <div className={Style.home}>
      <div className={Style.heroSection}>
        <div className={Style.heroSection_left}>
          <h1>ICO Launching Funny Token (FUN)</h1>
          <p>
            Tempory incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation consequat.
          </p>

          <div className={Style.heroSection_left_btn}>
            <button className={Style.btn}>Whitepaper</button>
            <button className={Style.btn}>product intro</button>
          </div>
        </div>
        <div className={Style.heroSection_right}>
          <Image
            src={funToken}
            alt="banner"
            width={300}
            height={300}
            className={Style.heroSection_right_img_one}
          />
          <Image
            src={funToken}
            alt="banner"
            width={200}
            height={200}
            className={Style.heroSection_right_img}
          />
          <Image
            src={funToken}
            alt="banner"
            width={100}
            height={100}
            className={Style.heroSection_right_img}
          />
          <Image
            src={funToken}
            alt="banner"
            width={50}
            height={50}
            className={Style.heroSection_right_img}
          />
          <Image
            src={funToken}
            alt="banner"
            width={20}
            height={20}
            className={Style.heroSection_right_img}
          />
        </div>
      </div>
      <Transfer
        NoOfToken={NoOfToken}
        TokenName={TokenName}
        TokenStandard={TokenStandard}
        TokenSymbol={TokenSymbol}
        TokenOwnerBal={TokenOwnerBal}
        transferToken={transferToken}
      />
      <User holderArray={holderArray} />
    </div>
  );
};

export default Home;
