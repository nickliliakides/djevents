import Head from "next/head";

const MetaLayout = ({
  title = "Music Events in Brighton | Find the hottest concerts and parties",
  keywords = "music, dj, events, party, concert, Brighton",
  description = "Find the latest concerts and DJ events in the city of Brighton",
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {children}
    </>
  );
};

export default MetaLayout;
