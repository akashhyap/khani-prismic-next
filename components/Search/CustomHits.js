import { connectStateResults } from "react-instantsearch-dom";
import Link from "next/link";

function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 3;

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p>Aw snap! No search results were found.</p>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <div className="algolia__search--result">
          <ol>
            {searchResults.hits.map((hit) => {
              const slug = hit.slug;
              const heading = hit.title.charAt(0).toUpperCase()
              + hit.title.slice(1)
              return (
                <li key={hit.objectID}>
                  {!slug ? undefined : (
                    <span>
                      <Link href={hit.slug}>{heading}</Link>
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </>
  );
}

export default connectStateResults(Hits);
