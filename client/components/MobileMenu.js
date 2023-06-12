import gsap from "gsap";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { truncateAddress } from "../utils/Common";

const MobileMenu = () => {
  const { user, connectMetamask, status } = useContext(UserContext);

  const closeMenu = () => {
    gsap.to(".mobile-menu", { duration: 1, left: "100vw" });
  };

  const openStatus = () => {
    const e = new CustomEvent("walletcheck", {
      detail: status,
    });
    window.dispatchEvent(e);
  };

  return (
    <div className="mobile-menu flex-column mobile-only-flex">
      <img
        src="/icons/close-white.svg"
        alt="close"
        className="top-right"
        onClick={closeMenu}
      />
      <div>
        <p className="fs-16 t-white-50 light">Menu</p>
        <a href="#story">
          <p
            className="fs-60 t-white all-caps medium mt-60"
            onClick={closeMenu}
          >
            Story
          </p>
        </a>
        <a href="#roadmap">
          <p
            className="fs-60 t-white all-caps medium mt-60"
            onClick={closeMenu}
          >
            Roadmap
          </p>
        </a>
        <a href="#faq">
          <p
            className="fs-60 t-white call-caps medium mt-60"
            onClick={closeMenu}
          >
            FAQ
          </p>
        </a>
      </div>
      <div>
        {/* <p className="fs-16 t-white-50 light">Social Media</p>
        <div className="flex-row mt-60 gap-30">
          <img src="/icons/insta.svg" alt="instagram" />
          <img src="/icons/twitter.svg" alt="twitter" />
          <img src="/icons/discord.svg" alt="discord" />
        </div> */}
      </div>
      {/* {user.walletAddress && (
        <div>
          <div className="cta fs-14 medium" style={{ width: "10rem" }}>
            {truncateAddress(user.walletAddress)}
          </div>
          <div
            className="cta fs-14 medium all-caps mt-20"
            onClick={openStatus}
            style={{ width: "10rem" }}
          >
            Allowlist
          </div>
        </div>
      )} */}
      {/* {!user.walletAddress && (
        <div>
          <div
            className="cta fs-14 medium"
            onClick={connectMetamask}
            style={{ width: "10rem" }}
          >
            CONNECT WALLET
          </div>
          <div
            className="cta fs-14 medium all-caps mt-20"
            onClick={openStatus}
            style={{ width: "10rem" }}
          >
            Allowlist
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MobileMenu;
