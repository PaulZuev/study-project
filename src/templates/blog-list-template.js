import React from "react"
import { useState } from 'react';
import { graphql } from "gatsby"
import { Link } from "gatsby"
 
const style = {
  prevButton : 'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
  nextButton : 'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
};

const GenericPage = ({ data, pageContext }) => {
  const posts = data.allDatoCmsArticle.edges;
  const feauter = data.datoCmsHomepage.featuredArticles
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPagePath = currentPage - 1 === 1 ? `${"/"}` : `${"/"}` + (currentPage - 1).toString();
  const nextPagePath = '/' + (currentPage + 1).toString();
  const prevPageClassName = isFirst ? (style.prevButton + " pointer-events-none") : style.prevButton ;
  const nextPageClassName = isLast ? (style.nextButton + " pointer-events-none") : style.nextButton;
  const allFilter = data.allDatoCmsFilter.nodes
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  console.log(pageContext);
  const getPageNumberPath = (currentIndex) => {
    if (currentIndex === 0){
      return `${"/"}`;
    }
    return `${"/"}` + (currentIndex + 1);
  }

  return (
    <main>
      <div className='container mx-auto'>
      <header className="main-header"><Link to={'/'} className="text-gray-700 block pb-6 text-5xl font-extrabold" role="menuitem">{data.datoCmsHomepage.title}</Link></header>
        <div className="relative inline-block text-left mb-6" >
          <div>
              <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => (setIsSortMenuOpen(!isSortMenuOpen))}>
            Filter tags
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            <div className={`z-10 origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${isSortMenuOpen ? '' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
              {allFilter.map(menu => {
                return(
                <Link to={`/filter/${menu.slug}`} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0" key={menu.originalId}>{menu.title}</Link>
                )
              })}
              </div>
            </div>
          </div>
        </div>
        {feauter.map( items => (
        <section className='mb-10' key={items.id}>
          <div className='container md:mx-auto'>
            <h2 className='text-4xl font-bold pb-3 tracking-tight text-gray-900'>
              {items.titleSe}
            </h2>
            <hr/>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8'>
              {items.featuredArticles.map(featuredArticles => (
                <div className="max-w-md border-solid border-1 bg-white rounded-xl drop-shadow-xl overflow-hidden md:max-w-2xl" key={featuredArticles.originalId}>
                  <div className="lg:flex p-4">
                    <div className="shrink-0 relative">
                      <img className="inline-block lg:h-32 lg:w-32 md:w-full rounded-lg ring-2 ring-white transition duration-0 ease-in-out hover:duration-150" src={featuredArticles.articlePicture.url} />
                    </div>
                    <div className="px-6">
                      <div className="group-button mb-3">
                        Tags:
                        { featuredArticles.tag.map((tags, id) =>{
                          return (
                            <Link to={`/filter/${tags.slug}`} key={id - tags.originalId} className="px-1 inline-flex items-center justify-center text-base font-medium rounded-md text-black  underline hover:decoration-2">{tags.title}</Link>
                            )
                          })
                        }  
                      </div> 
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{featuredArticles.articleTitle}</div>
                      <p className="mt-2 text-slate-500">{featuredArticles.articleShortText}</p>
                      <div className="flex justify-between">
                        <Link to={`/blog/${featuredArticles.slug}`} className=" mt-3 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Read more</Link>
                      </div> 
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </section>))}
        <section className='mb-10'>
          <div className='container mx-auto'>
            <h2 className='text-4xl font-bold tracking-tight text-gray-900 pb-3'>
              ALL post
            </h2>
            <hr/>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-4'>
          {posts.map(({ node }) => {
            return (
              <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={node.slug}>
              <div className="">
                <div className="md:shrink-0 relative">
                  <img className="h-48 w-full object-cover md:h-40 md:w-full" src={node.articlePicture.url} alt="Man looking at item at a store"/>
                  <div className="absolute bottom-2 left-5 tracking-wide text-sm text-white font-semibold">Date: {node.meta.publishedAt}</div>
                </div>
                <div className="p-6">
                  <div className="group-button mb-3">
                    Tags:
                    { node.tag.map((tags, id) =>{
                      return (
                        <Link to={`/filter/${tags.slug}`} key={id - tags.originalId} className="px-1 inline-flex items-center justify-center text-base font-medium rounded-md text-black  underline hover:decoration-2">{tags.title}</Link>
                        )
                      })
                    }  
                  </div>
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{node.articleTitle}</div>
                  <p className="mt-2 text-slate-500">{node.articleShortText}</p>
                  <div className="flex justify-between">
                    <Link to={`/blog/${node.slug}`} className=" mt-3 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Read more</Link>
                  </div>
                  
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
              <Link to={prevPagePath} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </Link>
              <Link to={nextPagePath} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </Link>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <Link to={prevPagePath} className={prevPageClassName}>
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    {Array.from({ length: numPages}, (_, i) => {
                        let pageNumberClassName = 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium';
                        if (currentPage === i + 1){
                          pageNumberClassName = 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                        }
                      return (
                        <Link to={getPageNumberPath(i)} key={ i + 1 } className={pageNumberClassName}> { i + 1 } </Link>
                      )
                      })
                    }
                    <Link to={nextPagePath} className={nextPageClassName}>
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
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
    allDatoCmsFilter {
      nodes {
        slug
        title
        originalId
      }
    }
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
          meta {
            publishedAt(formatString: "YYYY.DD.MM")
          }
          tag {
            slug
            title
            originalId
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
          tag {
            slug
            title
            originalId
          }
        }
      }
    }
  }
`
export default GenericPage