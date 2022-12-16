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

const Abruzzo = ({ abruzzo, navigation, footer, settings }) => {
  // console.log("abruzzo", abruzzo);
  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(abruzzo.data.title)}</title>
        <meta name="description" content={prismicH.asText(abruzzo.data.meta_description)} />
      </Head>
      <CityListWrapper>
        <CityHeader>
          <RichText field={abruzzo.data.title} className="page_title" />
          <RichText field={abruzzo.data.description} className="page_description" />
        </CityHeader>
        <CityProperty>
          <SliceZone slices={abruzzo.data.slices} components={components} />
        </CityProperty>
      </CityListWrapper>
    </Layout>
  );
};

export default Abruzzo;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const abruzzo = await client.getByUID("abruzzo", params.uid);
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      abruzzo,
      footer,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const abruzzos = await client.getAllByType("abruzzo");

  return {
    paths: abruzzos.map((abruzzo) => prismicH.asLink(abruzzo, linkResolver)),
    fallback: false,
  };
}
