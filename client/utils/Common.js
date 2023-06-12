import gsap from "gsap";
import { useEffect, useState, useCallback } from "react";

export const truncateAddress = (str) => {
  let newStr = "";
  for (let i = 0; i < 6; i++) {
    newStr += str.charAt(i);
  }
  newStr += "...";
  for (let i = str.length - 4; i < str.length; i++) {
    newStr += str.charAt(i);
  }
  return newStr;
};

export const openMintModal = (text, isAnim, status, success) => {
  gsap.set(".screen", { display: "flex" });
  gsap.set("#mint-modal", { display: "block" });
  document.getElementById("modal-text").innerHTML = text;
  if (isAnim) {
    gsap.set("#modal-anim", { display: "absolute" });
  } else {
    gsap.set("#modal-anim", { display: "none" });
  }
  if (status === "Success") {
    gsap.set("#modal-blur", { backgroundColor: "#0EBFBB" });
    document.getElementById("success-message").innerHTML = status;
    gsap.to("#modal-blur", { duration: 2, opacity: 1 });
    gsap.to("#success-image", { duration: 2, opacity: 1 });
    gsap.to("#success-message", { delay: 2, duration: 1, opacity: 1 });
  } else if (status === "Failure") {
    gsap.set("#modal-blur", { backgroundColor: "#F75D5D" });
    document.getElementById("success-message").innerHTML = status;
    gsap.to("#modal-blur", { duration: 2, opacity: 1 });
    gsap.to("#success-image", { duration: 2, opacity: 1 });
    gsap.to("#success-message", { delay: 1, duration: 1, opacity: 1 });
  } else {
    gsap.set("#modal-blur", { opacity: 0 });
    gsap.set("#success-image", { opacity: 0 });
    gsap.set("#success-message", { opacity: 0 });
  }
  if (success) {
    gsap.set("#modal-link", { display: "block" });
    gsap.set("#modal-text", { display: "none" });
  } else {
    gsap.set("#modal-link", { display: "none" });
    gsap.set("#modal-text", { display: "block" });
  }
  sessionStorage.setItem("canScroll", "false");
};

export const closeMintModal = () => {
  gsap.set(".screen", { display: "none" });
  gsap.set("#mint-modal", { display: "none" });
  sessionStorage.setItem("canScroll", "true");
};

export const validateEmail = (email) => {
  const res =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
};

export const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};
