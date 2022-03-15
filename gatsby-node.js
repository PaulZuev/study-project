
// exports.createPages = async ({ actions, graphql }) => {
//   const {createPage} = actions
//   const result = await graphql(`
//     {
//       datoCmsHomepage{
//         featuredArticles {
//           originalId
//           slug
//           articleText
//           articleTitle
//         }
//         slug
//         title
//         originalId
//       }
//     }
//   `)
//    console.log(result) 
//   // result.data.allDatoCmsHomepage = async () =>{
//   //   createPage({
//   //     path: `/${page.slug === "index" ? "" : page.slug}`,
//   //     component: require.resolve("./src/templates/generic-page.js"),
//   //     context: {
//   //       pageId: page.originalId,
//   //     },
//   //   })
//   // }
// }
