import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import RichText from "../../components/RichText";
import { CityListWrapper } from "../../components/CityListWrapper";
import { CityHeader } from "../../components/CityHeader";

const Toelettatori = ({ toelettatori, navigation, footer, settings }) => {
  // console.log("toelettatori", toelettatori);

  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(toelettatori.data.title)}</title>
      </Head>
      <CityListWrapper size="wider">
        <CityHeader>
          <RichText
            field={toelettatori.data.title}
            className="page_title mb-3"
          />
          <RichText
            field={toelettatori.data.description}
            className="description"
          />
        </CityHeader>
        <div className="city-list grid lg:grid-cols-4">
          <SliceZone
            slices={toelettatori.data.slices}
            components={components}
          />
        </div>
      </CityListWrapper>
    </Layout>
  );
};

export default Toelettatori;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const toelettatori = await client.getSingle("toelettatori");
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      toelettatori,
      footer,
      navigation,
      settings,
    },
  };
}
