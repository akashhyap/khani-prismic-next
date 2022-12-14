import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import * as prismicNext from "@prismicio/next";

import sm from "./sm.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {prismicH.LinkResolverFunction}
 */
export const linkResolver = (doc) => {
  switch (doc.type) {
    case "abruzzo":
      return `/abruzzo/${doc.uid}`;
      break;
    case "basilicata":
      return `/basilicata/${doc.uid}`;
      break;
    case "calabria":
      return `/calabria/${doc.uid}`;
      break;
    case "campania":
      return `/campania/${doc.uid}`;
      break;
    case "emilia_romagna":
      return `/emilia-romagna/${doc.uid}`;
      break;
    case "veterinari":
      return `/${doc.uid}`;
      break;
    case "toelettatori":
      return `/${doc.uid}`;
      break;
    case "razze_di_cani":
      return `/${doc.uid}`;
      break;
    case "guideutili":
      return `/${doc.uid}`;
      break;
    case "page":
      return `/${doc.uid}`;
      break;
    default:
      return "/";
  }
};

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const createClient = ({ previewData, req, ...config } = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, config);

  prismicNext.enableAutoPreviews({ client, previewData, req });

  return client;
};
