import * as React from "react";
import { graphql, Link } from "gatsby";

const filterPage = ({ data }) => {
  console.log(data)
  const filters = data.datoCmsFilter
  const allFilter = data.allDatoCmsFilter.nodes
  const allArticle = data.allDatoCmsArticle.nodes
  console.log(filters)
  return(
    <section className='mb-10'>
    <div className='md:container md:mx-auto'>
    <header className="main-header"><Link to={'/'} className="text-gray-700 block pb-6 text-5xl font-extrabold" role="menuitem">{data.datoCmsHomepage.title}</Link></header>
      <div className="relative inline-block text-left">
        <div>
          <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
            Filter tags
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="py-1" role="none">
          {allFilter.map(menu => {
            return(
              <Link to={`/filter/${menu.slug}`} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0" key={menu.originalId}>{menu.title}</Link>
            )
          })}
          </div>
        </div>
      </div>
      <h2 className='pt-6 text-2xl font-extrabold tracking-tight text-gray-900'>
        Post by {data.datoCmsFilter.title} tags
      </h2>

      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
        {allArticle.map(node => {
          return (
            <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={node.originalId}>
            <div className="">
              <div className="md:shrink-0">
                <img className="h-48 w-full object-cover md:h-40 md:w-full" src={node.articlePicture.url} alt="Man looking at item at a store"/>
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{node.articleTitle}</div>
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{node.meta.publishedAt}</div>
                <p className="mt-2 text-slate-500">{node.articleShortText}</p>
                <div className="flex justify-between">
                <Link to={`/blog/${node.slug}`} className=" mt-3 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Read more</Link>
                  <div className="group-button">
                    { node.tag.map((tags, id) =>{
                      return (
                        <Link to={`/filter/${tags.slug}`} key={id - tags.originalId} className=" m-1 mt-3 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-sky-500/100 hover:bg-sky-500/50">{tags.title}</Link>
                        )
                      })
                    }  
                  </div>
                </div> 
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  </section>
  ) 
}

export const query = graphql `
  query MyQuerySecond ($slug: String) {
    allDatoCmsFilter {
      nodes {
        title
        slug
      }
    }
    datoCmsHomepage{
      title
    }
    datoCmsFilter {
      slug
      title
    }
    allDatoCmsArticle(filter: {tag: {elemMatch: {slug: {eq: $slug}}}}) {
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
        tag {
          slug
          title
          originalId
        }
      }
    }

  }
`;
export default filterPage;