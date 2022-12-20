import React from "react";
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import RichText from "../../components/RichText";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const ClassificazioneBlock = ({ slice }) => {
  // console.log("slice==>", slice);
  // console.log("slice variation==>", slice.variation === 'lists');

  const listVariation = slice.variation === "lists";

  return (
    <section className="classificazione px-4 py-4 md:px-6">
      {slice.primary.title ? (
        <RichText field={slice.primary.title} className="page_title" />
      ) : (
        ""
      )}
      <div>
        {slice.items.map((item, i) => {
          return (
            <div
              key={i}
              className={`text md:text-xl md:leading-relaxed ${
                listVariation ? "lists" : ""
              }`}
            >
              {listVariation ? (
                <FontAwesomeIcon
                  icon={faCircle}
                  className="mr-2 icon"
                ></FontAwesomeIcon>
              ) : undefined}
              {prismicH.asText(item.text)}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ClassificazioneBlock;
