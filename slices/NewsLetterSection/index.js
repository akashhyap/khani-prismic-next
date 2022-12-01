import React from "react";
import RichText from "../../components/RichText";

const NewsLetterSection = ({ slice }) => {
  const introText = slice.primary.mailchimp_form[0].text;
  return (
    <section className="px-5 xl:px-0">
      <div className="newsletter mx-auto my-14 max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center rounded-[15px] bg-[#252525] py-11 lg:py-16 px-11 lg:px-14 text-white">
        {slice.primary.title ? (
          <RichText field={slice.primary.title} className="newsletter_title" />
        ) : (
          ""
        )}
        {introText && (
          <div
            className="newsletter_form md:pl-9"
            dangerouslySetInnerHTML={{ __html: introText }}
          ></div>
        )}
      </div>
    </section>
  );
};
export default NewsLetterSection;
