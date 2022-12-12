import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import RichText from "../../components/RichText";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faTimesCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Veterinari = ({ veterinari, navigation, footer, settings }) => {
  // console.log("veterinari", veterinari);

  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(veterinari.data.title)}</title>
      </Head>
      <main>
        <div className="city-intro mx-auto mb-5 max-w-5xl pl-6 pt-10 md:pl-0">
          <RichText field={veterinari.data.title} className="page_title mb-3" />
          <RichText field={veterinari.data.description} />
        </div>
        <div className="grid lg:grid-cols-4 city-list mx-auto mb-5 max-w-5xl pl-6 pt-10 md:pl-0">
          <SliceZone slices={veterinari.data.slices} components={components} />
        </div>
      </main>
    </Layout>
  );
};

export default Veterinari;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const veterinari = await client.getSingle("veterinari");
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      veterinari,
      footer,
      navigation,
      settings,
    },
  };
}
