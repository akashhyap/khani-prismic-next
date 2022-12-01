import React from "react";
import RichText from "../../components/RichText";
import { Bounded } from "../../components/Bounded";
import * as prismicH from "@prismicio/helpers";

const SectionHeader = ({ slice }) => (
  <Bounded as="section" size="wide">
    {prismicH.isFilled.richText(slice.primary.title) && (
      <div className="">
        <RichText field={slice.primary.title} className="section_header"/>
      </div>
    )}
  </Bounded>
);

export default SectionHeader;
