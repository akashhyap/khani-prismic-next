import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";

import { Bounded } from "../../components/Bounded";

const Text = ({ slice }) => {
  // console.log('slice', slice);
  return (
    <Bounded as="section" size="wide">
      {prismicH.isFilled.richText(slice.primary.text) && (
        <div
          className={`leading-relaxed md:text-xl md:leading-relaxed ${
            slice.variation === "blogPageText" ? "blog_page_text" : ""
          }`}
        >
          <PrismicRichText field={slice.primary.text} />
        </div>
      )}
    </Bounded>
  );
};

export default Text;
