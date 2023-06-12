import { useState, useEffect } from "react";
import gsap from "gsap";

const WalletModal = () => {
  const [closeTimer, setCloseTimer] = useState(5);
  const [status, setStatus] = useState("");

  let hydrated = false;
  useEffect(() => {
    if (!hydrated) {
      window.addEventListener("walletcheck", (e) => {
        gsap.set("#wallet-check", { display: "flex" });
        setStatus(e.detail);
        let time = 5;
        const interval = setInterval(() => {
          time = time - 1;
          setCloseTimer(time);
          if (time === 0) {
            clearTimeout(interval);
            gsap.set("#wallet-check", { display: "none" });
          }
        }, 1000);
      });
    }
    hydrated = true;
  }, []);

  return (
    <div id="wallet-check" className="mint-modal">
      <img src="/images/tower.png" alt="tower" style={{ width: "20%" }} />
      {status === "Allowlisted" && (
        <p className="fs-20 all-caps medium center">
          You are on the{" "}
          <span className="fs-20 all-caps medium t-tiffany-blue">
            allowlist
          </span>
        </p>
      )}
      {status === "Waitlisted" && (
        <p className="fs-20 all-caps medium center">
          You are on the{" "}
          <span className="fs-20 all-caps medium t-gold">waitinglist</span>
        </p>
      )}
      {status === "Public Minter" && (
        <p className="fs-20 all-caps medium center">
          You are{" "}
          <span className="fs-20 all-caps medium t-sizzling-red">not</span> on
          the allowlist
        </p>
      )}
      {status === "Unconnected" && (
        <p className="fs-20 all-caps medium center">
          Connect your wallet to view your status
        </p>
      )}
      <p
        className="all-caps pointer"
        onClick={() => gsap.set("#wallet-check", { display: "none" })}
      >
        Close <span className="t-white-50">[{closeTimer}]</span>
      </p>
    </div>
  );
};

export default WalletModal;
