import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import RichText from "../../components/RichText";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers"

const CityProperty = ({ slice }) => {
  return (
    <>
      {slice?.items?.map((item, i) => {
        const image = prismicH.asImageSrc(item.image) && item.image;
        return (
          <div key={i} className="city__prop flex flex-wrap items-center bg-white rounded-2xl shadow-md mb-14 p-10 lg:p-5">
            <figure className="property_img md:basis-1/4 max-w-[240px] mx-auto">
              <PrismicNextImage field={image} alt={item.title} className="rounded-full" />
            </figure>
            <div className="property_desc md:basis-3/4">
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
