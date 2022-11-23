import React from "react";
import { Helmet } from "react-helmet";
export default function MetaDecorator({ data }) {
  return (
    <>
      {/* {console.log(data.UserName)} */}
      <Helmet>
        <title>Caard</title>
        <meta
          name="msapplication-TileImage"
          content={
            "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          }
        />
        <meta property="og:title" content="some dummy title" />
        <meta name="description" content="dummy text" />
        <meta property="og:description" content="dummy text" />
        <meta property="og:image" content={data.ImageLocation} />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:url"
          content={`https://caard-website-react-saquibnasar.vercel.app/personal/${data.UserName}`}
        />
      </Helmet>
    </>
  );
}
