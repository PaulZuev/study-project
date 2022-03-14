
exports.createPages = async ({ actions, graphql }) => {
  const {createPage} = actions
  const result = await graphql(`
    {
      allDatoCmsHomepage {
        nodes {
          title
          slug
          originalId
          featuredArticles {
            articleTitle
            articleText
          }
        }
      }
    }
  `)
   console.log(result) 
  result.data.allDatoCmsHomepage.nodes.forEach(page =>{
    createPage({
      path: `/${page.slug === "index" ? "" : page.slug}`,
      component: require.resolve("./src/templates/generic-page.js"),
      context: {
        pageId: page.originalId,
      },
    })
  })
}