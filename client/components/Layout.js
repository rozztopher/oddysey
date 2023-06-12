import Nav from "./Nav";
import Meta from "./Meta";
import LoadingScreen from "./LoadingScreen";
import MobileMenu from "./MobileMenu";
import MintModal from "./MintModal";
import WalletModal from "./WalletModal";
import Screen from "./Screen";

const Layout = ({ children }) => {

  return (
    <>
      <Meta />
      <Nav />
      <LoadingScreen />
      <div style={{width: "100vw"}}>
      <MobileMenu />
      <MintModal />
      </div>
      <WalletModal />
      <Screen />

      <div className="container">
        <main className="main">{children}</main>
      </div>
    </>
  );
};

export default Layout;
