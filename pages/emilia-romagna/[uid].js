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

const EmiliaRomagna = ({ emilia_romagna, navigation, footer, settings }) => {
  // console.log("emilia_romagna", emilia_romagna);
  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(emilia_romagna.data.title)}</title>
      </Head>
      <CityListWrapper>
        <CityHeader>
          <CityBreadcrumb title={emilia_romagna.data.title} />
          <RichText field={emilia_romagna.data.title} className="page_title" />
          <RichText field={emilia_romagna.data.description} />
        </CityHeader>
        <CityProperty>
          <SliceZone
            slices={emilia_romagna.data.slices}
            components={components}
          />
        </CityProperty>
      </CityListWrapper>
    </Layout>
  );
};

export default EmiliaRomagna;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const emilia_romagna = await client.getByUID("emilia_romagna", params.uid);
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      emilia_romagna,
      footer,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const emilia_romagnas = await client.getAllByType("emilia_romagna");

  return {
    paths: emilia_romagnas.map((emilia_romagna) =>
      prismicH.asLink(emilia_romagna, linkResolver)
    ),
    fallback: false,
  };
}
