import Head from "next/head";
const Meta = ({ title, keyword, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="keywords" content={keyword} />
      <meta name="description" content={description} />
    </Head>
  );
};

Meta.defaultProps = {
  title: "NetFlix",
  keyword: "Web development programming",
  description: "Whatche your favorite movies here",
};

export default Meta;
