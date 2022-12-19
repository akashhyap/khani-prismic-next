import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import RichText from "../../components/RichText";
import { CityListWrapper } from "../../components/CityListWrapper";
import { CityHeader } from "../../components/CityHeader";
import { CityProperty } from "../../components/CityProperty";
import { CityBreadcrumb } from "../../components/CityBreadcrumb";

const Campania = ({ campania, navigation, footer, settings }) => {
  // console.log("campania", campania);
  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(campania.data.title)}</title>
      </Head>
      <CityListWrapper>
        <CityHeader>
          <CityBreadcrumb title={campania.data.title} />
          <RichText field={campania.data.title} className="page_title" />
          <RichText field={campania.data.description} />
        </CityHeader>
        <CityProperty>
          <SliceZone slices={campania.data.slices} components={components} />
        </CityProperty>
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
