import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { Home } from "../components/Home";



const Index = ({ footer, navigation, settings, homepage }) => {

  return (
    <Layout
      withHeaderDivider={false}
      footer={footer}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
      </Head>
      <Home homepage={homepage} />
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");
  const homepage = await client.getSingle("homepage");

  
  return {
    props: {
      footer,
      navigation,
      settings,
      homepage,
    },
  };
}
