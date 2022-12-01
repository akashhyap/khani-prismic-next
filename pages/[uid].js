
import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient, linkResolver } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";
import RichText from "../components/RichText";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faTimesCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import { TableOfContent } from "../components/TableOfContent";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const WORDS_PER_MINUTE = 255;

const ReadTime = ({ totalWords }) => {
  const time = Math.ceil(totalWords / WORDS_PER_MINUTE);
  return <span className="readtime">{time} minuti</span>;
};

const Page = ({ page, navigation, footer, settings }) => {
  const date = prismicH.asDate(
    settings.data.publishDate || settings.first_publication_date
  );

  const twoColumnsTag = page.tags[0];
  const articleContent = useRef(null);
  const [totalWords, setTotalWords] = useState(0);

  // console.log("articleContent", articleContent.current);

  useEffect(() => {
    const totalWords = !!twoColumnsTag && articleContent.current.innerText.split(" ").length;
    setTotalWords(totalWords)
  }, [twoColumnsTag]);

  return (
    <Layout navigation={navigation} footer={footer} settings={settings}>
      <Head>
        <title>
          {prismicH.asText(page.data.title)}
        </title>
      </Head>
      {!twoColumnsTag ? (
        <SliceZone slices={page.data.slices} components={components} />
      ) : (
        <>
          <RichText
            field={page.data.title}
            className="page_title mx-auto mb-5 max-w-5xl pl-6 md:pl-0 pt-10"
          />

          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 place-items-start">

            {/* Left Column */}

            <div className="article_content col-span-2 negativeMarginLeft" ref={articleContent}>
              {/* Blog meta info */}
              <div className="blog_meta_info px-6 py-4">
                <div className="grid md:grid-cols-6 gap-3 rounded-[15px] border-[1px] border-[#e5e7eb] bg-[#f2f2f2] px-5 py-3">
                  <div className="profile col-span-2 flex items-center">
                    <div className="profile_image relative mr-2">
                      <PrismicNextImage
                        field={settings.data.profilePicture}
                        layout="responsive"
                      />
                    </div>
                    <RichText field={settings.data.author_name} />
                  </div>

                  <div className="date_published col-span-2">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className=" mr-2"
                    ></FontAwesomeIcon>
                    <span>{dateFormatter.format(date)}</span>
                  </div>

                  <div className="col-span-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="mr-2"
                    ></FontAwesomeIcon>
                    <ReadTime totalWords={totalWords} />
                  </div>

                  <div className="profile col-start-1 col-end-4 flex items-center">
                    <span className="mr-5">Recensito da:</span>
                    <div className="profile_image relative mr-2">
                      <PrismicNextImage
                        field={settings.data.reviewed_by}
                        layout="responsive"
                      />
                    </div>
                    <RichText field={settings.data.reviewed_by_label} />
                  </div>

                  <div className="profile col-span-3 flex items-center">
                    <span className="mr-5">Controllato da:</span>
                    <div className="profile_image relative mr-2">
                      <PrismicNextImage
                        field={settings.data.checked_by}
                        layout="responsive"
                      />
                    </div>
                    <RichText field={settings.data.checked_by_label} />
                  </div>
                </div>
              </div>

              <SliceZone slices={page.data.slices} components={components} />
            </div>

            {/* Right Column */}

            <div className="relative py-4 place-self-start h-full px-5 lg:px-0">
              <SliceZone slices={page.data.slices1} components={components} />
              <RichText
                field={settings.data.site_disclaimer}
                className="disclaimer rounded-2xl border-[1px] border-[#b8dcf4] bg-[#f0f9ff] p-5 mb-8"
              />
              <TableOfContent />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid);
  const navigation = await client.getSingle("navigation");
  const footer = await client.getSingle("footer");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      footer,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => prismicH.asLink(page, linkResolver)),
    fallback: false,
  };
}
