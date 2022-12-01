import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";

import { components } from "../slices"

export const Home = ({ homepage }) => {
  // console.log("home", homepage);
  return (
    <>
      <div className="home relative">
        <SliceZone slices={homepage.data.slices} components={components} />
      </div>
    </>
  );
};
