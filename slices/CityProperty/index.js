import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import RichText from "../../components/RichText";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.CityPropertySlice} CityPropertySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CityPropertySlice>} CityPropertyProps
 * @param { CityPropertyProps }
 */
const CityProperty = ({ slice }) => {
  // console.log("slice", slice);
  return (
    <>
      {slice?.items?.map((item, i) => {
        return (
          <div key={i} className="city__prop flex items-center bg-white rounded-2xl shadow-md">
            <figure className="property_img max-w-[260px]">
              <PrismicNextImage field={item.image} alt={item.title} className="rounded-full" />
            </figure>
            <div className="property_desc px-4">
              <RichText field={item.title} className="title" />
              <RichText field={item.description} className="mb-5 mt-2 text-xl" />
              <RichText field={item.contact_information} className="desc_ph text-xl" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CityProperty;
