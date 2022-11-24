import React from "react";
import { Helmet } from "react-helmet";
export default function MetaDecorator() {
  return (
    <Helmet>
      <title>Caards</title>
      <meta
        data-react-helmet="true"
        name="title"
        content="deepak.kumar – Bio Links &amp; Creator Profile | Beacons Mobile Website Builder"
      />
      <meta
        data-react-helmet="true"
        name="description"
        content="@deepak.kumar | I m a Real Estate marketing influencer and I love to meet new people everyday I m also financial advisor which means my goal is to make people dreams come true Reality with Relationship."
      />
      <meta
        data-react-helmet="true"
        property="og:title"
        content="deepak.kumar – Bio Links &amp; Creator Profile | Beacons Mobile Website Builder"
      />
      <meta
        data-react-helmet="true"
        property="og:description"
        content="@deepak.kumar | I m a Real Estate marketing influencer and I love to meet new people everyday I m also financial advisor which means my goal is to make people dreams come true Reality with Relationship."
      />
      {/* <meta property="og:site_name" content="San Roque 2014 Pollos" /> */}
      <meta property="og:title" content="San Roque 2014 Pollos" />
      <meta property="og:description" content="Programa de fiestas" />
      {/* <meta
          property="og:image"
          itemprop="image"
          content="http://pollosweb.wesped.es/programa_pollos/play.png"
        /> */}
      {/* <meta property="og:type" content="website" /> */}
      {/* <meta property="og:updated_time" content="1440432930" /> */}

      {/* <meta
        data-react-helmet="true"
        property="og:image"
        content="https://cdn.beacons.ai/user_content/VpBCVoftePNbkOtEBMdwXegzXX13/profile_deepak.kumar.png?t=1634906140444"
      />
      <meta data-react-helmet="true" property="og:image:width" content="200" />
      <meta data-react-helmet="true" property="og:image:height" content="200" /> */}
      <meta
        data-react-helmet="true"
        property="og:url"
        content="https://caard-website-react-saquibnasar.vercel.app/personal/7"
      />
      <link
        rel="canonical"
        href="https://caard-website-react-saquibnasar.vercel.app/test"
      />
    </Helmet>
  );
}
