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

const Basilicata = ({ basilicata, navigation, footer, settings }) => {
  // console.log("basilicata", basilicata);
  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(basilicata.data.title)}</title>
      </Head>
      <CityListWrapper>
        <CityHeader>
          <CityBreadcrumb title={basilicata.data.title} />
          <RichText field={basilicata.data.title} className="page_title" />
          <RichText
            field={basilicata.data.description}
            className="page_description"
          />
        </CityHeader>
        <CityProperty>
          <SliceZone slices={basilicata.data.slices} components={components} />
        </CityProperty>
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
