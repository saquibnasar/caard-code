import React from "react";
import { Helmet } from "react-helmet";
export default function MetaDecorator() {
  return (
    <Helmet>
      <title>flax.ai</title>
      <meta data-react-helmet="true" name="title" content="dummy text" />
      <meta data-react-helmet="true" name="description" content="dummy text" />
      <meta data-react-helmet="true" property="og:title" content="dummy text" />
      <meta
        data-react-helmet="true"
        property="og:description"
        content="dummy text"
      />
      <link rel="stylesheet" href="./Helvetica NeueLTW0693BlkExtObl.otf" />
      <meta property="og:site_name" content="Caard" />
      <meta property="og:image" itemprop="image" content="/favicon.svg" />
    </Helmet>
  );
}
