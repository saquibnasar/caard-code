import React from "react";
import { Helmet } from "react-helmet";
export default function MetaDecorator() {
  return (
    <Helmet>
      <title>Caard</title>
      <meta data-react-helmet="true" name="title" content="dummy text" />
      <meta data-react-helmet="true" name="description" content="dummy text" />
      <meta data-react-helmet="true" property="og:title" content="dummy text" />
      <meta
        data-react-helmet="true"
        property="og:description"
        content="dummy text"
      />

      <meta property="og:site_name" content="Caard" />
      <meta property="og:image" itemprop="image" content="/favicon.svg" />
    </Helmet>
  );
}
