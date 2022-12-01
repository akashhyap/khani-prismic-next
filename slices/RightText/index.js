import React from "react";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.RightTextSlice} RightTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RightTextSlice>} RightTextProps
 * @param { RightTextProps }
 */
const RightText = ({ slice }) => {

  return (
    <section>
      <span className="title">
        {slice.primary.title ? (
          <PrismicRichText field={slice.primary.title} />
        ) : (
          ""
        )}
      </span>
    </section>
  );
};

export default RightText;
