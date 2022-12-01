import algoliasearch from "algoliasearch/lite";
import * as prismic from "@prismicio/client";
import fetch from "node-fetch";

const routes = [
  {
    type: "page",
    path: "/:uid",
  },
];

const endpoint = prismic.getEndpoint("khani");

const client = prismic.createClient(endpoint, { routes, fetch });

export default async function content(req, res) {
  const pages = await client.getAllByType("page", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
    lang: "en-us",
  });

  // const keys = Object.values(pages)

  console.log(typeof pages);

  res.send({ content: pages });
}
