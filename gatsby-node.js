const path = require("path")


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
    query {
      datoCmsHomepage{
        featuredArticles {
        ... on DatoCmsSection {
          id
          titleSe
          featuredArticles {
            articleShortText
            articleText
            articleTitle
            originalId
            slug
            articlePicture {
              url
            }
          }
        }
      }
        slug
        title
        originalId
        titleSection
      }
      allDatoCmsArticle {
        nodes {
          articleShortText
          articleText
          articleTitle
          originalId
          slug
          meta {
            publishedAt(formatString: "YYYY.DD.MM")
          }
          articlePicture {
            url
          }
        }
      }
    }
    `
  )

  const posts = result.data.allDatoCmsArticle.nodes
  const postsPerPage = 3
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}
