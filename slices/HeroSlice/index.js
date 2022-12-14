import RichText from "../../components/RichText";
import CustomLink from "../../components/CustomLink";
import { PrismicNextImage } from "@prismicio/next";

import * as prismicH from "@prismicio/helpers"

/**
 * @typedef {import("@prismicio/client").Content.HeroSliceSlice} HeroSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSliceSlice>} HeroSliceProps
 * @param { HeroSliceProps }
 */
const HeroSlice = ({ slice }) => {
  
  const introText = slice.primary.title[0].text;
  const splashImage = prismicH.asImageSrc(slice.primary.main_image) && slice.primary.main_image;
  
  return (
    <section className="section relative bg-black">
      <div className="absolute inset-0">
        <PrismicNextImage
          field={splashImage}
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <div className="absolute inset-0" />
      </div>
      <div className="container relative mx-auto max-w-5xl pt-16">
        <div
          className="hero_title mb-10 text-center"
          dangerouslySetInnerHTML={{ __html: introText }}
        ></div>

        <figure>
          {slice?.items?.map((item, i) => {
            const insetImage = prismicH.asImageSrc(item.inset_image) && item.inset_image;
            return (
              <PrismicNextImage
                key={i}
                field={insetImage}
                layout="responsive"
                width={240}
                height={83}
                objectFit="contain"
                className="pointer-events-none select-none"
              />
            );
          })}
        </figure>
      </div>
    </section>
  );
};

export default HeroSlice;
