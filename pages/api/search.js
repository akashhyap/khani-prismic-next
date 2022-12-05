// import * as prismic from "@prismicio/client";
// import fetch from "node-fetch";

// const routes = [
//   {
//     type: "page",
//     path: "/:uid",
//   },
// ];

// const endpoint = prismic.getEndpoint("khani");

// const client = prismic.createClient(endpoint, { routes, fetch });

// export default async function content(req, res) {
//   const pages = await client.getAllByType("page", {
//     orderings: {
//       field: "document.first_publication_date",
//       direction: "desc",
//     },
//     lang: "en-us",
//   });

//   const results = req.query.q
//     ? pages.filter(({ id, uid, data }) => {
//         let title = data.title[0].text;

//         return {
//           objectID: id,
//           slug: uid.toLowerCase().includes(req.query.q),
//           title: title || uid,
//         };
//       })
//     : [];

//   // console.log("=============");
//   // console.log(req.query.q);
//   // const data = pages
//   // const data = pages.map(({ id, uid }) => {
//   //     return {
//   //       objectID: uid,
//   //     };
//   //   });
//   //   res.send({ results });

//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify({ results }));
// }
