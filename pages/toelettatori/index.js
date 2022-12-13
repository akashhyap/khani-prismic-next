import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import RichText from "../../components/RichText";

const Toelettatori = ({ toelettatori, navigation, footer, settings }) => {
  // console.log("toelettatori", toelettatori);

  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(toelettatori.data.title)}</title>
      </Head>
      <div className="mx-auto max-w-5xl px-4 pt-10">
        <div className="city-page-header mb-8 rounded-2xl bg-neutral-800 p-10 text-white">
          <RichText
            field={toelettatori.data.title}
            className="page_title mb-3"
          />
          <RichText
            field={toelettatori.data.description}
            className="description"
          />
        </div>
        <div className="city-list grid lg:grid-cols-4">
          <SliceZone
            slices={toelettatori.data.slices}
            components={components}
          />
        </div>
      </div>
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
