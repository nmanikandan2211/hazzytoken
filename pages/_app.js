import "../styles/globals.css";

//internal import
import { ERC20Provider } from "../context/HazzyToken";
import NavBar from "../components/NavBar/NavBar";

const MyApp = ({ Component, pageProps }) => (
  <ERC20Provider>
    <Component {...pageProps} />;
  </ERC20Provider>
);

export default MyApp;
