const dotenv = require("dotenv");
const algoliasearch = require("algoliasearch/lite");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

try {
  dotenv.config();
  if (!process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID) {
    throw new Error("NEXT_PUBLIC_ALGOLIA_APPLICATION_ID is not defined");
  }
  if (!process.env.ALGOLIA_ADMIN_KEY) {
    throw new Error("ALGOLIA_ADMIN_KEY is not defined");
  }
} catch (error) {
  console.log(error);
  process.exit(1);
}

async function getAllPosts() {
  const pages = await fetch(
    "https://khani.cdn.prismic.io/api/v2/documents/search?ref=Y4cvQRAAACMAsg2K"
  )
    .then((response) => response.json())
    .then((data) => data.results);

  // console.log('pages',pages);
  return pages;
}

function transformPostsToSearchObjects(pages) {
  const transformed = pages.map(({ id, uid, data }) => {
    // console.log("title", uid ? uid.split("-").join(" ") : "dummy");

    return {
      objectID: id,
      slug: uid,
      title: uid ? uid.split("-").join(" ") : "",
    };
  });

  return transformed;
}

(async function () {
  dotenv.config();

  try {
    const posts = await getAllPosts();

    const transformed = transformPostsToSearchObjects(posts);

    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
      process.env.ALGOLIA_ADMIN_KEY
    );

    const index = client.initIndex("prismic_CONTENT");

    const algoliaResponse = await index.saveObjects(transformed);

    console.log(`Added ${algoliaResponse.objectIDs.length}`);
  } catch (err) {
    console.log(err);
  }
})();
