import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import RichText from "../../components/RichText";
import { CityListWrapper } from "../../components/CityListWrapper";

const Calabria = ({ calabria, navigation, footer, settings }) => {
  // console.log("calabria", calabria);
  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(calabria.data.title)}</title>
      </Head>
      <CityListWrapper>
        <div className="city-intro mb-8">
          <RichText field={calabria.data.title} className="page_title mb-3" />
          <RichText field={calabria.data.description} className="mb-3" />
        </div>
        <div className="city-property grid grid-cols-1">
          <SliceZone slices={calabria.data.slices} components={components} />
        </div>
      </CityListWrapper>
    </Layout>
  );
};

export default Calabria;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const calabria = await client.getByUID("calabria", params.uid);
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      calabria,
      footer,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const calabrias = await client.getAllByType("calabria");

  return {
    paths: calabrias.map((calabria) =>
      prismicH.asLink(calabria, linkResolver)
    ),
    fallback: false,
  };
}
