import RichText from "../../components/RichText";
import CustomLink from "../../components/CustomLink";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.HeroSliceSlice} HeroSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSliceSlice>} HeroSliceProps
 * @param { HeroSliceProps }
 */
const HeroSlice = ({ slice }) => {
  const introText = slice.primary.title[0].text;
  // console.log("introText", introText);
  return (
    <section className="section relative bg-black">
      <div className="absolute inset-0">
        <PrismicNextImage
          field={slice.primary.main_image}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0" />
      </div>
      <div className="container relative mx-auto max-w-5xl pt-16">
        {/* <RichText
        field={slice.primary.title}
        className="hero_title"
      /> */}

        <div
          className="hero_title mb-10 text-center"
          dangerouslySetInnerHTML={{ __html: introText }}
        ></div>

        <figure>
          {slice?.items?.map((item, i) => {
            return (
              <PrismicNextImage
                key={i}
                field={item.inset_image}
                layout="responsive"
                width={240}
                height={83}
                objectFit="contain"
                alt={item.inset_image.alt}
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
