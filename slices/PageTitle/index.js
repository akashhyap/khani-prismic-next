import React from "react";
import RichText from "../../components/RichText";
import { Bounded } from "../../components/Bounded";
import * as prismicH from "@prismicio/helpers";

const PageTitle = ({ slice }) => {
  const ID = slice.primary?.title[0]?.text.toLowerCase().split(" ").join("-");
  return (
    <Bounded as="section" size="wider">
      {prismicH.isFilled.richText(slice.primary.title) && (
        <RichText field={slice.primary.title} className="page_title" id={ID} />
      )}
    </Bounded>
  );
};
export default PageTitle;

