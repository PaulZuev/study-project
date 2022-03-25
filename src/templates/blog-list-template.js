import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Header from "../components/Header/header";
import Filters from "../components/Filters/filters";
import PostCard from "../components/PostCard/postCard";
import ArrowRight from "../images/arrowRight.svg";
import ArrowLeft from "../images/arrowLeft.svg";

const style = {
  prevButton : 'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
  nextButton : 'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
  link : "mt-3 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700",
  tags: "px-1 inline-flex items-center justify-center text-base font-medium rounded-md text-black  underline hover:decoration-2",
};

const GenericPage = ({ data, pageContext }) => {
  const posts = data.allDatoCmsArticle.edges;
  const feauter = data.datoCmsHomepage.featuredArticles
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPagePath = currentPage - 1 === 1 ? `${"/"}` : `${"/"}` + `/${currentPage - 1}`;
  const nextPagePath = `/${currentPage + 1}`
  const prevPageClassName = isFirst ? (style.prevButton + " pointer-events-none") : style.prevButton ;
  const nextPageClassName = isLast ? (style.nextButton + " pointer-events-none") : style.nextButton;
  const getPageNumberPath = (currentIndex) => {
    return(
      currentIndex === 0 ? `${"/"}` : `${"/"}` + (currentIndex + 1)
    )
  }

  return (
    <main>
      <div className='container mx-auto'>
      <Header title={data.datoCmsHomepage.title}/>
      <Filters allFilter={data.allDatoCmsFilter.nodes}/>
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
                <PostCard key={featuredArticles.originalId} node={featuredArticles}/>
              ))
            }
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
                        <Link to={`/filter/${tags.slug}`} key={id - tags.originalId} className={style.tags}>{tags.title}</Link>
                        )
                      })
                    }  
                  </div>
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{node.articleTitle}</div>
                  <p className="mt-2 text-slate-500">{node.articleShortText}</p>
                  <div className="flex justify-between">
                    <Link to={`/blog/${node.slug}`} className={style.link}>Read more</Link>
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
              <Link to={prevPagePath} className={prevPageClassName}> Previous </Link>
              <Link to={nextPagePath} className={nextPageClassName}> Next </Link>
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
                      <ArrowLeft/>
                    </Link>
                    {Array.from({ length: numPages}, (_, i) => {
                        const pageNumberClassName = 'hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium';
                        const additionalClass = currentPage === i + 1 ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-300 text-gray-500"
                        return (
                          <Link to={getPageNumberPath(i)} key={ i + 1 } className={`${pageNumberClassName} ${additionalClass}`}> { i + 1 } </Link>
                        )
                      })
                    }
                    <Link to={nextPagePath} className={nextPageClassName}>
                      <span className="sr-only">Next</span>
                      <ArrowRight/>
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