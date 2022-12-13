import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import RichText from "../../components/RichText";
import { CityListWrapper } from "../../components/CityListWrapper";

const Basilicata = ({ basilicata, navigation, footer, settings }) => {
  // console.log("basilicata", basilicata);
  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(basilicata.data.title)}</title>
      </Head>
      <CityListWrapper>
        <div className="city-intro mb-8">
          <RichText field={basilicata.data.title} className="page_title mb-3" />
          <RichText field={basilicata.data.description} className="mb-3" />
        </div>
        <div className="city-property grid grid-cols-1">
          <SliceZone slices={basilicata.data.slices} components={components} />
        </div>
      </CityListWrapper>
    </Layout>
  );
};

export default Basilicata;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const basilicata = await client.getByUID("basilicata", params.uid);
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      basilicata,
      footer,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const basilicatas = await client.getAllByType("basilicata");

  return {
    paths: basilicatas.map((basilicata) =>
      prismicH.asLink(basilicata, linkResolver)
    ),
    fallback: false,
  };
}
