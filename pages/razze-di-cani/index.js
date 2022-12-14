import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { createClient, linkResolver } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import RichText from "../../components/RichText";
import { CityListWrapper } from "../../components/CityListWrapper";
import { CityHeader } from "../../components/CityHeader";
import { Bounded } from "../../components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { Breadcrumb } from "../../components/Breadcrumb";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const RazzeDiCani = ({
  razze_di_cani,
  pages,
  navigation,
  footer,
  settings,
}) => {
  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(razze_di_cani.data.title)}</title>
        <meta
          name="description"
          content={prismicH.asText(razze_di_cani.data.meta_description)}
        />
      </Head>
      <SliceZone slices={razze_di_cani.data.slices} components={components} />
      <Bounded size="widest">
        {/* Breadcrumb */}
        <Breadcrumb title={prismicH.asText(razze_di_cani.data.title)} />
        {/* End Breadcrumb */}
        <div className="mt-4 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((post, i) => {
            // console.log("post", post);
            const cani = post.tags.find((tag) => tag === "cani");
            const postImage = post.data?.slices[0];
            const date = prismicH.asDate(
              razze_di_cani.data.publishDate ||
                razze_di_cani.first_publication_date
            );

            if (cani) {
              return (
                <div className="card" key={post.id}>
                  <Link href={post.uid} legacyBehavior>
                    <a>
                      <figure className="relative">
                        <PrismicNextImage
                          field={postImage.primary?.image}
                          layout="responsive"
                          width={3}
                          height={2}
                          alt={prismicH.asText(post.data.title)}
                          priority="true"
                        />
                      </figure>
                      <div className="card-desc">
                        <div className="title py-4">
                          <h3>{prismicH.asText(post.data.title)}</h3>
                          <div className="more_desc">
                            <h6>{dateFormatter.format(date)}</h6>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </Bounded>
    </Layout>
  );
};

export default RazzeDiCani;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });
  const pages = await client.getAllByType("page", {
    orderings: [
      {
        field: "document.first_publication_date",
        direction: "desc",
      },
      { field: "my.pages.publishDate", direction: "desc" },
    ],
    lang: "en-us",
  });
  const razze_di_cani = await client.getSingle("razze_di_cani");
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      razze_di_cani,
      footer,
      navigation,
      settings,
      pages,
    },
  };
}
