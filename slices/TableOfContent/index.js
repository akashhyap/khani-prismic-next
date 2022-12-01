import React from "react";
import { PrismicRichText } from "@prismicio/react";

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, fas } from "@fortawesome/free-solid-svg-icons";

function useHeadings() {
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h2:not([class^='brief_title'])")
    ).map((element) => element.textContent);
    setHeadings(elements);
  }, []);
  return headings;
}

const TableOfContent = ({ slice }) => {
  const headings = useHeadings();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const winWidth = window.screen.width < 768;
    if (winWidth) {
      setIsMobile(true);
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <section className="mx-auto max-w-6xl py-11 px-5 xl:px-0">
          <nav className="table_of_content sticky top-6 rounded-[15px] border-[1px] border-[#e5e7eb] bg-[#f2f2f2] px-5 py-8">
            <h3 className="title pb-2 uppercase">INDICE</h3>
            <ul>
              {headings.map((heading) => {
                const ID = heading.toLowerCase().split(" ").join("-");
                return (
                  <li key={heading}>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="bullet mr-2"
                    ></FontAwesomeIcon>
                    <a href={`#${ID}`}>{heading}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </section>
      ) : undefined}
    </>
  );
};

export default TableOfContent;
