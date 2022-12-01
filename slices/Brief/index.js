import React from "react";
import RichText from "../../components/RichText";
import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
/**
 * @typedef {import("@prismicio/client").Content.BriefSlice} BriefSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BriefSlice>} BriefProps
 * @param { BriefProps }
 */
const Brief = ({ slice }) => {
  // console.log(slice);
  return (
    <section className="brief_wrapper mb-8">
      <h2 className="brief_title">{slice.primary.title[0].text}</h2>
      {/* {slice.primary.title ? <RichText field={slice.primary.title} className="brief_title" /> : ""} */}
      {slice?.items?.map((item, i) => {
        return (
          <div key={i} className={`brief brief-${i}`}>
            <PrismicRichText field={item.value} />
            <PrismicRichText field={item.label} />
          </div>
        );
      })}
    </section>
  );
};

export default Brief;
