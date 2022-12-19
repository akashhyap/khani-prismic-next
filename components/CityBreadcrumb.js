import Link from "next/link";
import { useRouter } from "next/router";
export const CityBreadcrumb = ({ title }) => {
  let router = useRouter();
  let slugPath = router.asPath;
  let slug = /[^/+]+$/.exec(slugPath)[0].split('-')[0]

  return (
    <div className="pb-5">
      <ul className="flex city_breadcrumb">
        <li className="mr-1 ml-1">
          <Link href={`/${slug}/`} legacyBehavior> 
             <a className="capitalize">{slug}</a>
          </Link>
        </li>
        <li>{title[0].text}</li>
      </ul>
    </div>
  );
};
