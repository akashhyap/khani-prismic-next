import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "./Bounded";
import { Search } from "./Search";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const NavItem = ({ children }) => {
  return (
    <li className="text-[22px] leading-10 text-[#0f2a49] lg:text-[18px] lg:leading-normal">
      {children}
    </li>
  );
};

export const Header = ({ navigation }) => {
  const [searchModel, setSearchModel] = useState(false);

  const onSearchHandler = () => {
    setSearchModel(true);
  };

  const [shownav, setShowNav] = useState(false);

  const menuHandler = (event) => {
    setShowNav(!shownav);
  };

  const logo =
    prismicH.isFilled.image(navigation.data.logo) && navigation.data.logo;

  return (
    <Bounded as="header" size="widest" className="bg-white">
      <div className="flex items-center justify-between gap-20">
       
          <PrismicLink href="/" className="relative flex site__logo col-span-1 h-[50px] w-[249px]">
            <PrismicNextImage
              field={logo}
              layout="fill"
              className="object-contain"
            />
          </PrismicLink>
      
        {/* Toggle Menu Icon */}
        <span className="toggle_icon md:hidden" onClick={menuHandler}>
          <FontAwesomeIcon icon={faBars} className="ml-2"></FontAwesomeIcon>
        </span>
        <nav
          className={`menu_wrapper flex-1 translate-x-full justify-end px-10 md:flex md:transform-none md:px-0 ${
            shownav ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <span className="toggle_icon flex md:hidden" onClick={menuHandler}>
            <FontAwesomeIcon
              icon={faXmark}
              className="ml-2 text-white"
            ></FontAwesomeIcon>
          </span>

          <ul className="flex flex-wrap lg:items-center lg:justify-center lg:gap-10">
            {navigation.data?.links.map((item) => (
              <NavItem key={prismicH.asText(item.label)}>
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </NavItem>
            ))}
          </ul>
        </nav>
        <span
          onClick={onSearchHandler}
          className="search__icon cursor-pointer hover:text-indigo-900"
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="ml-2"
          ></FontAwesomeIcon>
        </span>
      </div>
      <div className={`stikcy_nav ${searchModel ? "stikcy_nav--open" : ""}`}>
        <div className="stikcy_nav--content mx-auto max-w-6xl px-5 xl:px-0">
          <Search onSearchHandlerClose={setSearchModel} />
        </div>
      </div>
    </Bounded>
  );
};
