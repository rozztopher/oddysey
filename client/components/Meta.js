import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <title>ALMA X JACK IRVING : ODYSSEY</title>
      <meta name="title" content="ALMA X JACK IRVING : ODYSSEY"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta
        name="description"
        content="The deep sea opens its gates 🗝️ An emergence approaches 🫧 Dive into a world free of limitations 💫"
      ></meta>
      <meta charSet="utf-8" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://odysseycollection.io/images/header.png" />
      <meta property="og:title" content="ALMA X JACK IRVING : ODYSSEY" />
      <meta
        property="og:description"
        content="The deep sea opens its gates 🗝️ An emergence approaches 🫧 Dive into a world free of limitations 💫"
      />
      <meta property="og:image" content="https://odysseycollection.io/images/header.png"></meta>

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://odysseycollection.io/images/header.png" />
      <meta property="twitter:title" content="ALMA X JACK IRVING : ODYSSEY" />
      <meta
        property="twitter:description"
        content="The deep sea opens its gates 🗝️ An emergence approaches 🫧 Dive into a world free of limitations 💫"
      />
      <meta property="twitter:image" content="https://odysseycollection.io/images/header.png" />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

Meta.defaultProps = {
  title: "ALMA X JACK IRVING : ODYSSEY",
  keywords: "web3",
  description:
    "The deep sea opens its gates 🗝️ An emergence approaches 🫧 Dive into a world free of limitations 💫",
};

export default Meta;
