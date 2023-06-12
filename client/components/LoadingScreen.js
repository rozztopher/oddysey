import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LoadingScreen = () => {
  const loadingContainer = useRef(null);

  useEffect(() => {
    const loadingAnim = lottie.loadAnimation({
      container: loadingContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../public/animations/loading-animation.json"),
    });

    var opacity = 0;
    var intervalID = 0;
    window.onload = fadeout;
    function fadeout() {
      setInterval(hide, 100);
    }
    function hide() {
      var body = document.querySelector(".loading-screen");
      opacity = Number(
        window.getComputedStyle(body).getPropertyValue("opacity")
      );

      if (opacity > 0) {
        opacity = opacity - 0.1;
        body.style.opacity = opacity;
      } else {
        clearInterval(intervalID);
        body.style.display = "none"
      }
    }

    setTimeout(() => {
      fadeout()
    }, 4000);

    return () => {
      loadingAnim.destroy();
    };
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-anim" ref={loadingContainer}></div>
    </div>
  );
};

export default LoadingScreen;
