import Link from "next/link";

export const Breadcrumb = ({ title }) => {
  return(
    <>
      <ul className="city_breadcrumb flex py-5">
        <li>
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
        </li>
        <li>{title}</li>
      </ul>
    </>
  );
};
