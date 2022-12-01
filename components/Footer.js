import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import RichText from "../components/RichText";

import { Bounded } from "./Bounded";

const NavItem = ({ children }) => {
  return <li className="text-[18px] text-[#0f2a49] leading-9">{children}</li>;
};

export const Footer = ({ footer, navigation }) => {
  // console.log("footer", footer);

  const logo = prismicH.isFilled.image(footer.data.image) && footer.data.image;
  const copyright = footer.data.copyright;

  return (
    <>
      <Bounded as="footer" size="widest" className="py-14 mt-16 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          <div className="relative col-span-1 h-[50px] w-[300px]">
            <PrismicLink href="/">
              {prismicH.isFilled.image(logo) && (
                <PrismicNextImage
                  field={logo}
                  layout="fill"
                  className="object-contain"
                />
              )}
            </PrismicLink>
          </div>
          <nav>
            <ul className="flex flex-col">
              {navigation.data?.links.map((item) => (
                <NavItem key={prismicH.asText(item.label)}>
                  <PrismicLink field={item.link}>
                    <PrismicText field={item.label} />
                  </PrismicLink>
                </NavItem>
              ))}
            </ul>
          </nav>
        </div>
      </Bounded>
      <div className="grid grid-cols-1 bg-[#1f1f1f] py-2">
        <RichText field={copyright} className="copyright" />
      </div>
    </>
  );
};
