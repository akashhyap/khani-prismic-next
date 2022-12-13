import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import RichText from "../../components/RichText";
import { CityListWrapper } from "../../components/CityListWrapper";

const Campania = ({ campania, navigation, footer, settings }) => {
  // console.log("campania", campania);
  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(campania.data.title)}</title>
      </Head>
      <CityListWrapper>
        <div className="city-intro mb-8">
          <RichText field={campania.data.title} className="page_title mb-3" />
          <RichText field={campania.data.description} className="mb-3" />
        </div>
        <div className="city-property grid grid-cols-1">
          <SliceZone slices={campania.data.slices} components={components} />
        </div>
      </CityListWrapper>
    </Layout>
  );
};

export default Campania;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const campania = await client.getByUID("campania", params.uid);
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      campania,
      footer,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const campanias = await client.getAllByType("campania");

  return {
    paths: campanias.map((campania) => prismicH.asLink(campania, linkResolver)),
    fallback: false,
  };
}
