import React from "react"
import { graphql } from "gatsby"

const GenericPage = ({ data, pageContext }) => {
  console.log(pageContext);
  const posts = data.allDatoCmsArticle.edges;
  const feauter = data.datoCmsHomepage.featuredArticles
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  console.log(isLast);
  const prevPagePath = currentPage - 1 === 1 ? '/' : '/' + (currentPage - 1).toString();
  const nextPagePath = '/' + (currentPage + 1).toString();
  const prevPageClassName = isFirst ? "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 pointer-events-none" : "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50";
  const nextPageClassName = isLast ? "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 pointer-events-none" : "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50";
  const getPageNumberPath = (currentIndex) => {
    if (currentIndex === 0){
      return '/';
    }
    return '/' + (currentIndex + 1);
  }
  return (
    <main>
      <div className='md:container md:mx-auto'>
        <h1 className='mt-2 mb-12 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{feauter.title}</h1>
        {feauter.map( items => (
        <section className='mb-10' key={items.id}>
          <div className='md:container md:mx-auto'>
            <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
              {items.titleSe}
            </h2>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
              {items.featuredArticles.map(featuredArticles => (
                <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={featuredArticles.originalId}>
                  <div className="">
                    <div className="md:shrink-0">
                      <img className="h-48 w-full object-cover md:h-40 md:w-full" src={featuredArticles.articlePicture.url} alt="Man looking at item at a store"/>
                    </div>
                    <div className="p-8">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{featuredArticles.articleTitle}</div>
                      <p className="mt-2 text-slate-500">{featuredArticles.articleShortText}</p>
                      <a href={`/blog/${featuredArticles.slug}`} className=" mt-3 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Read more</a>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </section>))}
        <section className='mb-10'>
          <div className='md:container md:mx-auto'>
            <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
              ALL post
            </h2>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
          {posts.map(({ node }) => {
            return (
              <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={node.slug}>
              <div className="">
                <div className="md:shrink-0">
                  <img className="h-48 w-full object-cover md:h-40 md:w-full" src={node.articlePicture.url} alt="Man looking at item at a store"/>
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{node.articleTitle}</div>
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{node.meta.publishedAt}</div>
                  <p className="mt-2 text-slate-500">{node.articleShortText}</p>
                  <a href={`/blog/${node.slug}`} className=" mt-3 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Read more</a>
                </div>
              </div>
            </div>
            )
          })}
          </div>
        </section>
        <section className='mb-10'>
          <div className='md:container md:mx-auto'>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
                <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href={prevPagePath} className={prevPageClassName}>
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    {Array.from({ length: numPages}, (_, i) => {
                        let pageNumberClassName = 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium';
                        if (currentPage === i + 1){
                          pageNumberClassName = 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                        }
                      return (
                        <a href={getPageNumberPath(i)} key={ i + 1 } className={pageNumberClassName}> { i + 1 } </a>
                      )
                      })
                    }
                    <a href={nextPagePath} className={nextPageClassName}>
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
export const blogListQuery = graphql`
  query BlogPageQuery ($skip: Int!, $limit: Int!){
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
    allDatoCmsArticle(sort: {fields: slug, order: DESC}, limit: $limit, skip:$skip) {
      edges {
        node {
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
  }
`
export default GenericPage