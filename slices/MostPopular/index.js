import RichText from "../../components/RichText";
import { PrismicLink } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers"

const MostPopular = ({ slice }) => {
  // console.log("popular", slice);
  return (
    <section className="mx-auto max-w-6xl py-11 px-5 xl:px-0">
      {slice.primary.title ? (
        <RichText field={slice.primary.title} className="section_title" />
      ) : (
        ""
      )}
      {slice.primary.description ? (
        <RichText field={slice.primary.description} />
      ) : (
        ""
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {slice?.items?.map((item, i) => {
          const coverPhoto = prismicH.asImageSrc(item.cover_photo) && item.cover_photo;
          return (
            <div key={`${slice.id}-${i}`} className="card">
              <PrismicLink field={item.link} className="relative">
                <PrismicNextImage field={coverPhoto}/>
                <div className="card-desc">
                  <RichText field={item.category} className="category" />
                  <RichText field={item.dog_title} className="title py-4" />
                  <RichText field={item.more_info} className="more_desc" />
                </div>
              </PrismicLink>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MostPopular;
