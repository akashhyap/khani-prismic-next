import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";
import RichText from "../../components/RichText";

/**
 * @typedef {import("@prismicio/client").Content.CityListSlice} CityListSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CityListSlice>} CityListProps
 * @param { CityListProps }
 */
const CityList = ({ slice }) => {
  // console.log('slice', slice);
  return (
    <div className="city__card">
      <span className="title">
        {slice.primary.title ? (
          <PrismicRichText field={slice.primary.title} />
        ) : (
          <h2>Add Title</h2>
        )}
      </span>
      {slice.primary.title ? (
        <div className="mt-4">
          {slice?.items?.map((item, i) => {
            return (
              <PrismicLink
                key={`${item.city_link.id}-${i}`}
                field={item.city_link}
              >
                <RichText field={item.city_name} className="city_name" />
              </PrismicLink>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CityList;
