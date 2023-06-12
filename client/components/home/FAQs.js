import { QandAs } from "../../utils/Constants";
import { useState } from "react";
import gsap from "gsap";
import ServerClient from "../../utils/ServerClient";
import { validateEmail } from "../../utils/Common";

const FAQs = () => {
  const [active, setActive] = useState(-1);

  const handleClick = (i) => {
    if (i === active) {
      setActive(-1);
    } else {
      setActive(i);
    }
  };

  const captureEmail = async () => {
    const email = document.getElementById("email-input").value;
    const message = document.getElementById("email-message");
    gsap.set("#email-message", { opacity: 1 });
    if (validateEmail(email)) {
      const res = await ServerClient.post(
        "api/captureEmail",
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      message.innerHTML = res.data.data.message;
    } else {
      message.innerHTML = "Please enter a valid email";
    }
  };

  const QandA = (props) => {
    const { q, a, i } = props;
    const icon = i === active ? "close" : "plus";

    return (
      <div className="fill mt-60">
        <div
          className="flex-row fill space-between pointer"
          onClick={() => handleClick(i)}
        >
          <h3>{q}</h3>
          <img className="pointer icon" src={`/icons/${icon}.svg`} alt="plus" />
        </div>
        {i === active && <p className="mt-40 fs-20 light t-white-80">{a}</p>}
        <div className="flex-row fill space-between ai-center mt-60">
          <div className="light-dot" />
          <div className="horizontal-divider ml-20"></div>
        </div>
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="footer mt-100">
        <h3 className="fs-54 medium">Subscribe for news and updates</h3>
        <div className="flex-row space-between mt-60">
          <input id="email-input" type="text" placeholder="EMAIL"></input>
          <div className="flex-row ai-center">
            <div
              className="big-circle submit-circle ml-40 pointer"
              onClick={captureEmail}
              onMouseEnter={submitHover}
              onMouseLeave={submitLeave}
            >
              Submit
            </div>
          </div>
        </div>
        <p id="email-message" className="fs-16 t-tiffany-blue">
          &nbsp;
        </p>
        <div className="horizontal-divider mt-20"></div>
        <p className="fs-16 t-white-80 mt-40 mb-50">© Alma 2022</p>
      </div>
    );
  };

  const submitHover = () => {
    gsap.to(".submit-circle", { duration: 1, borderWidth: "10px" });
  };

  const submitLeave = () => {
    gsap.to(".submit-circle", { duration: 1, borderWidth: "2px" });
  };

  return (
    <div style={{ width: "85%" }} className="flex-column ai-center">
      <div id="faq" className="flex-column ai-center mb-50 mt-60">
        <h2 id="faq-header" className="fs-72 medium left mt-120">
          FAQ
        </h2>
        {QandAs.map((faq, i) => {
          return <QandA q={faq.q} a={faq.a} i={i} key={faq.q} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;
