import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const GenericPage = props => {
  console.log("PROPS: ", props)
  const result = useStaticQuery(graphql`
  {
    datoCmsHomepage{
      featuredArticles {
        originalId
        slug
        articleText
        articleTitle
        articleShortText
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
      }
    }
  }
  `)
  return (
    <main>
      <div className='md:container md:mx-auto'>
        <h1 className='mt-2 mb-12 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>{result.datoCmsHomepage.title}</h1>
        <section className='mb-10'>
          <div className='md:container md:mx-auto'>
            <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
              {result.datoCmsHomepage.titleSection}
            </h2>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {result.datoCmsHomepage.featuredArticles.map(featuredArticles => (
              <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={featuredArticles.originalId}>
                <div className="">
                  <div className="md:shrink-0">
                    <img className="h-48 w-full object-cover md:h-40 md:w-full" src="https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=404&q=80" alt="Man looking at item at a store"/>
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{featuredArticles.articleTitle}</div>
                    <p className="mt-2 text-slate-500">{featuredArticles.articleShortText}</p>
                    <a href="#" className=" mt-3 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Read more</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className='mb-10'>
          <div className='md:container md:mx-auto'>
            <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
              ALL post
            </h2>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {result.allDatoCmsArticle.nodes.map(featuredArticles => (
              <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={featuredArticles.originalId}>
                <div className="">
                  <div className="md:shrink-0">
                    <img className="h-48 w-full object-cover md:h-40 md:w-full" src="https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=404&q=80" alt="Man looking at item at a store"/>
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{featuredArticles.articleTitle}</div>
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{featuredArticles.meta.publishedAt}</div>
                    <p className="mt-2 text-slate-500">{featuredArticles.articleShortText}</p>
                    <a href="#" className=" mt-3 inline-flex items-center justify-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Read more</a>
                  </div>
                </div>
              </div>
            ))}
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
                    Showing
                    <span className="font-medium">1</span>
                    to
                    <span className="font-medium">10</span>
                    of
                    <span className="font-medium">97</span>
                    results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>
                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>
                    <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
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



export default GenericPage