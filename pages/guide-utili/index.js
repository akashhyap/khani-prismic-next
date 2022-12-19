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

const GuideUtili = ({ guideutili, pages, navigation, footer, settings }) => {
  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>{prismicH.asText(guideutili.data.title)}</title>
        <meta
          name="description"
          content={prismicH.asText(guideutili.data.meta_description)}
        />
      </Head>
      <SliceZone slices={guideutili.data.slices} components={components} />
      <Bounded size="widest">
        {/* Breadcrumb */}
        <Breadcrumb title={prismicH.asText(guideutili.data.title)} />
        {/* End Breadcrumb */}
        <div className="mt-4 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((post, i) => {
            const guideUtili = post.tags.find((tag) => tag === "guideUtili");
            const postImage = post.data?.slices;
            const date = prismicH.asDate(
              guideutili.data.publishDate || guideutili.first_publication_date
            );
            if (guideUtili) {
              return (
                <Link key={post.id} href={post.uid} legacyBehavior>
                  <a>
                    <div className="card relative">
                      <figure className="relative">
                        {postImage?.map((image, i) => {
                          return (
                            <PrismicNextImage
                              key={i}
                              field={image.primary?.image}
                              layout="responsive"
                              width={3}
                              height={2}
                              priority="true"
                              alt=""
                            />
                          );
                        })}
                      </figure>
                      <div className="card-desc">
                        <div className="title py-4">
                          <h3>{post.data.title[0].text}</h3>
                          <div className="more_desc">
                            <h6>{dateFormatter.format(date)}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            }
          })}
        </div>
      </Bounded>
    </Layout>
  );
};

export default GuideUtili;

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
  const guideutili = await client.getSingle("guideutili");
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      guideutili,
      footer,
      navigation,
      settings,
      pages,
    },
  };
}
