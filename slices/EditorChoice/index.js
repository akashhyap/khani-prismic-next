import RichText from "../../components/RichText";
import CustomLink from "../../components/CustomLink";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers"

const EditorChoice = ({ slice }) => {
  // console.log("popular", slice);
  return (
    <section className="editors_choice max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-7 mt-4 py-11 px-5 xl:px-0">
      <div>
        {slice.primary.sub_title ? (
          <RichText field={slice.primary.sub_title} className="category" />
        ) : (
          ""
        )}
        {slice.primary.title ? (
          <RichText field={slice.primary.title} className="section_title" />
        ) : (
          ""
        )}
        {slice.primary.description ? (
          <RichText field={slice.primary.description} className="description" />
        ) : (
          ""
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 col-span-2">
        {slice?.items?.map((item, i) => {
          const image = prismicH.asImageSrc(item.image) && item.image;
          return (
            <div key={i} className="card">
              <PrismicNextImage field={image}/>
              <div className="card-desc">
                <RichText field={item.title} className="title py-2" />
                <RichText field={item.description} className="more_desc" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EditorChoice;
