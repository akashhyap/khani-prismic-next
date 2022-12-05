// import algoliasearch from "algoliasearch/lite";
// import * as prismic from "@prismicio/client";
// import fetch from "node-fetch";

// const dotenv = require("dotenv");

// try {
//   dotenv.config();
//   if (!process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID) {
//     throw new Error("NEXT_PUBLIC_ALGOLIA_APPLICATION_ID is not defined");
//   }
//   if (!process.env.ALGOLIA_ADMIN_KEY) {
//     throw new Error("ALGOLIA_ADMIN_KEY is not defined");
//   }
// } catch (error) {
//   console.log(error);
//   process.exit(1);
// }

// const routes = [
//   {
//     type: "page",
//     path: "/:uid",
//   },
// ];

// const endpoint = prismic.getEndpoint("khani");

// const client = prismic.createClient(endpoint, { routes, fetch });

// async function getAllPosts() {
//   const pages = await client.getAllByType("page", {
//     orderings: {
//       field: "document.first_publication_date",
//       direction: "desc",
//     },
//     lang: "en-us",
//   });

//   const algoliaPosts = pages.map(({ id, uid, data }) => {
//     let title = data.title[0].text;

//     return {
//       objectID: id,
//       slug: uid,
//       title: title || uid,
//     };
//   });

//   return pages;
// }

// function transformPostsToSearchObjects(pages) {
//   const transformed = pages.map(({ id, uid, data }) => {
//     let title = data.title[0].text;

//     return {
//       objectID: id,
//       slug: uid,
//       title: title || uid,
//     };
//   });

//   return transformed;
// }

// (async function () {
//   dotenv.config();

//   try {
//     const posts = await getAllPosts();
//     const transformed = transformPostsToSearchObjects(posts);

//     const client = algoliasearch (
//         process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
//         process.env.ALGOLIA_ADMIN_KEY,
//     )

//     const index = client.initIndex("prismic_CONTENT")
      
//     const algoliaResponse = await index.saveObjects(transformed)

//     console.log(`Added ${algoliaResponse.objectIDs.length}`);

//   } catch (err) {
//     console.log(err);
//   }
// })();
