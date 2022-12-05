import React from "react";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import CustomSearchBox from "./CustomSearchBox";
import CustomHits from "./CustomHits";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);


export const Search = ({onSearchHandlerClose}) => {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="prismic_CONTENT">
        <CustomSearchBox onCloseHandler={onSearchHandlerClose}/>
        <CustomHits />
      </InstantSearch>
    </>
  );
};
