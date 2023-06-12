import { useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import lottie from "lottie-web";
import { useMediaQuery } from "../../utils/Common";

const Story = () => {
  let hydrated = false;
  const animContainer = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const anim = lottie.loadAnimation({
      container: animContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: require("../../public/animations/story.json"),
    });

    anim.setSpeed(4.5);
    anim.play();

    setTimeout(() => {
      anim.goToAndStop(0, true);
    }, 2000);

    const update = (e) => {
      const frames = anim.getDuration(true);
      const progress = e.progress;
      const time = Math.floor(frames * progress);
      if (time < frames && time >= 0) {
        anim.goToAndStop(time, true);
      }
    };

    if (!hydrated) {
      ScrollTrigger.create({
        trigger: "#story",
        start: "top top",
        end: "bottom center",
        onUpdate: update,
        onEnter: () => gsap.set("#tower-anim", { position: "fixed", top: 0 }),
      });

      ScrollTrigger.create({
        trigger: "#story",
        start: "top top",
        end: "bottom bottom",
        onLeave: () =>
          gsap.set("#tower-anim", {
            position: "absolute",
            bottom: 0,
            top: "initial",
          }),
        onEnterBack: () => gsap.set("#tower-anim", { position: "fixed" }),
        onLeaveBack: () =>
          gsap.set("#tower-anim", {
            position: "absolute",
            top: 0,
            bottom: "initial",
          }),
      });
    }

    return () => {
      anim.destroy();
    };
  });

  const isBreakpoint = useMediaQuery(1023);

  const Block1 = () => {
    return (
      <div className="block-1">
        <div style={{ width: "50%" }}>
          <img
            className="mobile-hidden tablet-hidden fill"
            src="/images/title2.png"
          ></img>
        </div>
        {isBreakpoint && (
          <>
            <img
              className="mobile-only tablet-only"
              src="/images/title.png"
              style={{ width: "100%" }}
            ></img>
            {/* <div
              style={{
                position: "relative",
                padding: "56.25% 0 0 0",
                width: "100%",
              }}
            >
              <iframe
                className="mt-20 mobile-only tablet-only"
                src="https://player.vimeo.com/video/766384771?h=5673be7749&badge=0&autopause=0&player_id=0&app_id=58479/embed"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div> */}
          </>
        )}
      </div>
    );
  };

  const Block2 = () => {
    return (
      <div className="block-2">
        <div className="flex-row">
          <img
            className="mobile-hidden tablet-hidden"
            src="/images/tower.png"
            alt="tower"
          />
          <div className="flex-column space-between ml-80 full-height ai-center mobile-hidden tablet-hidden">
            <div className="light-dot" />
            <div className="faded-dot" />
            <div className="faded-dot" />
            <div className="faded-dot" />
            <div className="faded-dot" />
            <div className="faded-dot" />
            <div className="faded-dot" />
            <div className="faded-dot" />
            <div className="faded-dot" />
            <div className="faded-dot" />
            <div className="light-dot" />
          </div>
          <div>
            <p className="mw-30 t-white-80 fs-20 ml-80">
              Homo-sapiens have been drawn to deep space for millennia, but we
              have been blinded by the light of a thousand suns, and can no
              longer see the true potential on earth.
            </p>
            <p className="mw-30 t-white-80 fs-20 ml-80 mt-20">
              Six towers are our beacons. They do not reach out, but within.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const Block3 = () => {
    return (
      <div className="block-3">
        <div className="flex-row jc-flex-end">
          <p className="fs-20 t-white-80 mw-30">
            The oceans are the genesis of life itself, yet have remained
            untouched for millennia. We come from the vast darkness, so create
            our own light. Free from the limitations of the world ashore, we
            float weightlessly with the tides.
          </p>
        </div>
        <div className="flex-row ai-center mt--40 jc-flex-end mobile-hidden tablet-hidden">
          <div style={{ width: "55%" }} className="flex-row ai-center">
            <div
              className="circle-container"
              style={{ height: "168px", width: "200px" }}
            >
              <div
                className="circle-container"
                style={{ height: "48px", width: "48px" }}
              >
                <div className="light-dot" />
              </div>
            </div>
            <div className="horizontal-divider"></div>
          </div>
        </div>
        <div className="flex-row flex-end jc-flex-end mt--40 mobile-hidden tablet-hidden">
          <p className="fs-14 t-white-50">Organic</p>
        </div>
        <div
          className="fill flex-row jc-flex-end"
          style={{ position: "relative" }}
        ></div>
      </div>
    );
  };

  const Block4 = () => {
    return (
      <div className="block-4">
        <p className="fs-32 medium">
          We have chosen a host for our project;
          <span className="fs-32 t-tiffany-blue medium"> Jack Irving</span>
        </p>
        <p className="fs-20 mt-60">
          Our selection is not without thought. We have noticed him pushing the
          laws of nature - the boundaries of life itself. His cerebrum is
          connected to our BIOLINK, bridging the gap to digital product,
          unleashing his true potential.
        </p>
      </div>
    );
  };

  return (
    <div
      style={{ width: "100%" }}
      className="flex-column ai-center"
      id="app-start"
    >
      {!isBreakpoint && (
        <div
          id="tower-anim"
          className="mobile-hidden tablet-hidden"
          ref={animContainer}
        />
      )}
      <div
        style={{ width: "100%", overflowX: "hidden" }}
        className="flex-row jc-center"
      >
        <div id="story">
          <Block1 />
          <Block2 />
          {isBreakpoint && (
            <img
              src="/images/emerald-tower.png"
              alt="tower"
              className="mobile-only tablet-only fill"
            />
          )}
          <Block3 />
          <Block4 />
        </div>
      </div>
    </div>
  );
};

export default Story;
