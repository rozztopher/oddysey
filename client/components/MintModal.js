import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import { closeMintModal } from "../utils/Common";

const MintModal = () => {
  const animContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../public/animations/minting-animation.json"),
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div className="mint-modal" id="mint-modal">
      <img
        id="modal-close"
        src="/icons/close.svg"
        className="top-right pointer"
        alt="close"
        onClick={closeMintModal}
      />
      <div
        id="modal-success"
        className="absolute-center flex ai-center jc-center"
      >
        <div id="modal-blur" className="fill absolute-center"></div>
        <img
          id="success-image"
          src="/images/tower.png"
          className="fill absolute-center"
          alt="tower"
        />
        <p id="success-message" className="all-caps fs-24 z-3">
          Success
        </p>
      </div>
      <div
        id="modal-anim"
        className="absolute-center"
        ref={animContainer}
      ></div>
      <p id="modal-text" className="fs-14 all-caps medium center">
        Minting, do not leave page
      </p>
      <a
        id="modal-link"
        className="fs-14 all-caps medium center t-tiffany-blue"
        href=""
        target="_blank"
        rel="noreferrer"
      >
        Go to OpenSea
      </a>
    </div>
  );
};

export default MintModal;
