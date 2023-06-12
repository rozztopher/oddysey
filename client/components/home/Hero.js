import { useMediaQuery } from "../../utils/Common";

const Hero = () => {
  const scrollToStory = () => {
    const section = document.getElementById("story");
    section.scrollIntoView({ behavior: "smooth" });
  };

  const isBreakpoint = useMediaQuery(1023);

  return (
    <div
      className="hero-section mobile-hidden tablet-hidden"
      style={{ overflow: "hidden" }}
    >
      <div className="title-container">
        <div className="title-content">
          <img
            className="fill"
            src="/images/title.png"
            id="title-image"
            alt="odyssey"
          />
          <div className="title-links flex-row">
            <a href="https://opensea.io/collection/almaxjackirving-odyssey" target="_blank" rel="noreferrer">
              <div
                className="hero-cta all-caps medium"
                style={{ width: "10rem" }}
              >
                <img src="/icons/opensea.svg" style={{ width: "1.5rem" }}></img>
                OpenSea
              </div>
            </a>
            <a
              href="https://player.vimeo.com/video/766384771?h=5673be7749&badge=0&autopause=0&player_id=0&app_id=58479"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className="hero-cta all-caps medium"
                style={{ width: "10rem" }}
              >
                <img src="/icons/vimeo.svg" style={{ width: "1.5rem" }}></img>
                Trailer
              </div>
            </a>
            <div
              className="hero-cta all-caps medium"
              style={{ width: "10rem" }}
              onClick={scrollToStory}
            >
              <img src="/icons/odyssey.svg" style={{ width: "1.5rem" }}></img>
              Story
            </div>
          </div>
        </div>
      </div>
      {!isBreakpoint && (
        <video id="hero-video" muted loop playsInline autoPlay>
          <source src="videos/short_1080p_5mbps.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default Hero;
