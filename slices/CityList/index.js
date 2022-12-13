import React from "react";
import { PrismicLink, PrismicRichText } from "@prismicio/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/**
 * @typedef {import("@prismicio/client").Content.CityListSlice} CityListSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CityListSlice>} CityListProps
 * @param { CityListProps }
 */
const CityList = ({ slice }) => {
  return (
    <div className="city__card mt-7">
      <span className="title">
        {slice.primary.title ? (
          <PrismicRichText field={slice.primary.title} />
        ) : (
          <h2>Add Title</h2>
        )}
      </span>
      {slice.primary.title ? (
        <ul className="mt-4">
          {slice?.items?.map((item, i) => {
            return (
              <li key={`${item.city_link.id}-${i}`} className="city_name text-lg leading-8">
                <PrismicLink field={item.city_link}>
                  <span className="">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="mr-2 text-[#ff9f88]"
                    ></FontAwesomeIcon>
                  </span>
                  <span>{item.city_name[0].text}</span>
                </PrismicLink>
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default CityList;
