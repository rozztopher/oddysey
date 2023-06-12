import Link from "next/link";
import gsap from "gsap";
import { ERC721context } from "../contexts/ERC721context";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { truncateAddress } from "../utils/Common";
import detectEthereumProvider from "@metamask/detect-provider";

const Nav = () => {
  const { user, connectMetamask, status } = useContext(UserContext);
  const { initContract } = useContext(ERC721context);
  const checked = false;

  useEffect(() => {
    if (!checked) {
      init();
    }
    checked = true;
  }, []);

  const init = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      initContract();
    }
  };

  const openMenu = () => {
    gsap.to(".mobile-menu", { duration: 1, left: 0 });
  };

  const openStatus = () => {
    const e = new CustomEvent("walletcheck", {
      detail: status,
    });
    window.dispatchEvent(e);
  };

  return (
    <nav className="nav">
      <div className="nav-container mt-40">
        <Link href="/">
          <img
            className="nav-logo pointer"
            src="/images/odyssey-logo.png"
            alt="odyssey"
          />
        </Link>
        <img
          src="/icons/hamburger.svg"
          alt="hamburger"
          className="mobile-only tablet-only"
          onClick={openMenu}
          style={{ width: "24px" }}
        />

        <div className="flex ai-center gap-40 mobile-hidden tablet-hidden">
          <a href="#story">
            <p className="fs-14 t-white-50 nav-item pointer mobile-hidden tablet-hidden">
              Story
            </p>
          </a>
          <a href="#roadmap">
            <p className="fs-14 t-white-50 nav-item pointer mobile-hidden tablet-hidden">
              Roadmap
            </p>
          </a>
          <a href="#faq" style={{marginRight: "5rem"}}>
            <p className="fs-14 t-white-50 nav-item pointer mobile-hidden tablet-hidden">
              FAQ
            </p>
          </a>
          {/* {user.walletAddress && (
            <>
              <div
                className="cta fs-14 medium mobile-hidden tablet-hidden all-caps"
                onClick={openStatus}
                style={{ width: "10rem" }}
              >
                Allowlist
              </div>
              <div
                className="cta fs-14 medium mobile-hidden tablet-hidden"
                style={{ width: "10rem" }}
              >
                {truncateAddress(user.walletAddress)}
              </div>
            </>
          )} */}
          {/* {!user.walletAddress && (
            <>
              <div
                className="cta fs-14 medium mobile-hidden tablet-hidden all-caps"
                onClick={openStatus}
                style={{ width: "10rem" }}
              >
                Allowlist
              </div>
              <div
                className="cta fs-14 medium mobile-hidden tablet-hidden all-caps"
                onClick={connectMetamask}
                style={{ width: "10rem" }}
              >
                Connect wallet
              </div>
            </>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
