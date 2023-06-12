import Layout from "../components/Layout";
import UserContext from "../contexts/UserContext";
import ERC721context from "../contexts/ERC721context";
import Script from "next/script";
import { useEffect, useState } from "react";
import "../styles/layout.css";
import "../styles/fonts.css";
import "../styles/colors.css";
import "../styles/components.css";
import "../styles/nav.css";
import "../styles/story.css";
import "../styles/mint.css";
import "../styles/artist.css";
import "../styles/faq.css";
import "../styles/roadmap.css";
import "../styles/hero.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    sessionStorage.setItem("audio", "false");

    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
    })
  }, [width]);

  return (
    <>
      <UserContext>
        <ERC721context>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ERC721context>
      </UserContext>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-JJYL2S7NMB"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JJYL2S7NMB');
        `}
      </Script>
    </>
  );
}

export default MyApp;
