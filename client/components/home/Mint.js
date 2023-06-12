import { useEffect, useRef, useState, useContext } from "react";
import lottie from "lottie-web";
import gsap from "gsap";
import { ERC721context } from "../../contexts/ERC721context";
import { UserContext } from "../../contexts/UserContext";
import { openMintModal, useMediaQuery } from "../../utils/Common";

const Mint = () => {
  const totalSupply = 6000;
  const buttonContainer = useRef(null);
  const mobileButtonContainer = useRef(null);
  let buttonAnim;

  const [totalMinted, setTotalMinted] = useState(-1);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState("");
  const [ethereum, setEthereum] = useState(false);

  const {
    mint,
    totalTokensMinted,
    erc721,
    mintingAllowed,
    getAlienCoefficient,
    allowlistMintingAllowed,
  } = useContext(ERC721context);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (erc721 && erc721.methods) {
      getContractData();
      getStatus();
    }
    if (window.ethereum) {
      setEthereum(true);
    }
    buttonAnim = lottie.loadAnimation({
      container: buttonContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../public/animations/mint-button.json"),
    });
    const mobileButtonAnim = lottie.loadAnimation({
      container: mobileButtonContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../public/animations/mint-button.json"),
    });

    return () => {
      buttonAnim.destroy();
      mobileButtonAnim.destroy();
    };
  });

  useEffect(() => {
    setHydrated(true);
    window.addEventListener("mintsuccess", getContractData);
  }, [status]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const getStatus = async () => {
    if (parseInt(totalMinted) === totalSupply) {
      setStatus("Sold Out");
      return;
    }
    const minting = await mintingAllowed();
    if (minting) {
      setStatus("Public Mint");
      return;
    }
    const allowlist = await allowlistMintingAllowed();
    if (allowlist) {
      const coefficient = await getAlienCoefficient();
      if (coefficient) {
        setStatus("Waitlist Mint");
        return;
      } else {
        setStatus("Allowlist Mint");
        return;
      }
    }
  };

  const handleMint = async () => {
    if (window.ethereum) {
      if (user.walletAddress) {
        if (erc721 && erc721.methods) {
          mint(user.walletAddress);
        } else {
          openMintModal("Internal error", false, "Failure", false);
        }
      } else {
        openMintModal("Please connect your wallet", false, "Failure", false);
      }
    } else {
      openMintModal(
        "Current browser does not support minting",
        false,
        "Failure",
        false
      );
    }
  };

  const getContractData = async () => {
    if (window.ethereum) {
      const tt = await totalTokensMinted();
      setTotalMinted(tt);
    } else {
      setTotalMinted(0);
    }
  };

  const handleEnter = () => {
    buttonAnim.setSpeed(0.25);
    gsap.to(".b-gradient", {
      duration: 1,
      background:
        "linear-gradient( 180deg, rgba(14, 191, 187, 0.3) 0%, rgba(14, 191, 187, 0.8) 100% )",
    });
  };

  const handleLeave = () => {
    buttonAnim.setSpeed(1);
    gsap.to(".b-gradient", {
      duration: 1,
      background:
        "linear-gradient( 180deg, rgba(14, 191, 187, 0.15) 0%, rgba(14, 191, 187, 0.4) 100% )",
    });
  };

  const MintDetails = () => {
    return (
      <div id="mint-details" className="mw-30 flex-column space-between">
        <p id="mint-blue" className="fs-54 t-tiffany-blue all-caps">
          Mint
        </p>
        <div>
          <p id="mint-header" className="fs-140 all-caps lh-08">
            Dive deeper
          </p>
          <p id="mint-p" className="fs-20 mt-15">
            Journey into our oceans, a world without limits.
          </p>
        </div>
        <div className="mobile-hidden tablet-hidden">
          {/* <div
            className="cta fs-14 medium all-caps"
            onClick={handleMint}
            style={{ width: "10rem" }}
          >
            Mint
          </div> */}
          {parseInt(totalMinted) === totalSupply && (
            <SoldOut device="desktop" />
          )}
        </div>
      </div>
    );
  };

  const TowerCard = () => {
    const a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    return (
      <div id="video-container">
        <video id="card-video" muted loop playsInline autoPlay>
          <source src="videos/hidden.mp4" type="video/mp4" />
        </video>
        <div id="tower-card" className="tower-card">
          <img src="/icons/eth.svg" alt="ethereum" className="top-right o-25" />
          <div
            id="mint-trigger"
            className="absolute-center"
            style={{ width: "100%" }}
          ></div>
          <div className="flex-row space-between tower-dots ai-center">
            <div className="light-dot" />
            {a.map((b, i) => {
              return <div className="faded-dot" key={b + "" + i} />;
            })}
            <div className="light-dot" />
          </div>
          {ethereum && (
            <div className="flex-row space-between tower-info">
              <div>
                <p className="mt-14 t-tiffany-blue">Minted</p>
                <p className="fs-24 medium mt-20">{6000}</p>
              </div>
              <div>
                <p className="mt-14 t-tiffany-blue">Remaining</p>
                <p className="fs-24 medium mt-20">
                  {0}
                </p>
              </div>
            </div>
          )}
          {!ethereum && (
            <div className="flex-row space-between tower-info">
              <div>
                <p className="mt-14 t-tiffany-blue">Supply</p>
                <p className="fs-24 medium mt-20">{totalSupply}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Stats = () => {
    return (
      <div id="mint-stats" className="flex-column flex-end space-around">
        <div className="mint-stat">
          <p className="fs-16 t-white-50 stat-header right">
            Allowlist minting
          </p>
          <p className="mt-15 medium fs-24 right stat-label">
            14 Nov. 06:00 UTC
          </p>
        </div>
        <div className="mint-stat">
          <p className="fs-16 t-white-50 stat-header right">Waitlist minting</p>
          <p className="mt-15 medium fs-24 right stat-label">
            14 Nov. 18:00 UTC
          </p>
        </div>
        <div className="mint-stat">
          <p className="fs-16 t-white-50 stat-header right">Public mint</p>
          <p className="mt-15 medium fs-24 right stat-label">
            14 Nov. 20:00 UTC
          </p>
        </div>
      </div>
    );
  };

  const SoldOut = (props) => {
    const { device } = props;
    const className =
      device === "desktop"
        ? "sold-out-container flex-row ai-center"
        : "sold-out-container flex-row jc-center fill";
    return (
      <div className="sold-out-container flex-row ai-center">
        <div className="sold-out-outer">
          <div className="sold-out-inner">
            <p className="fs-18 all-caps medium">Sold</p>
            <p className="fs-18 all-caps medium">out</p>
          </div>
        </div>
        <div className="sold-out-line" />
        <img className="ml-16" src="/icons/lock.svg" alt="lock" />
      </div>
    );
  };

  const isBreakpoint = useMediaQuery(1023);

  return (
    <div id="mint" className="flex-column ai-center jc-center">
      {isBreakpoint && (
        <div className="flex-column jc-center mt-100">
          <MintDetails />
          <Stats />
          <TowerCard />
          {/* <div
            className="cta fs-14 medium all-caps"
            onClick={handleMint}
            style={{ width: "10rem" }}
          >
            Mint
          </div> */}
          {parseInt(totalMinted) === totalSupply && <SoldOut device="mobile" />}
        </div>
      )}

      {!isBreakpoint && (
        <div className="flex-row space-between fill mt-120">
          <MintDetails />
          <TowerCard />
          <Stats />
        </div>
      )}
    </div>
  );
};

export default Mint;
