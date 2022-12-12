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

const CityDetail = ({ citydetail, navigation, footer, settings }) => {
  console.log("citydetail", citydetail);

  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(citydetail.data.title)}</title>
      </Head>
      <main className="mx-auto max-w-4xl pl-6 pt-10 md:pl-0">
        <div className="city-intro mb-8">
          <RichText field={citydetail.data.title} className="page_title mb-3" />
          <RichText field={citydetail.data.description} className="mb-3" />
        </div>
        <div className="city-property mb-5 grid grid-cols-1">
          <SliceZone slices={citydetail.data.slices} components={components} />
        </div>
      </main>
    </Layout>
  );
};

export default CityDetail;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const citydetail = await client.getByUID("citydetail", params.uid);
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      citydetail,
      footer,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const citydetails = await client.getAllByType("citydetail");

  return {
    paths: citydetails.map((citydetail) =>
      prismicH.asLink(citydetail, linkResolver)
    ),
    fallback: false,
  };
}
