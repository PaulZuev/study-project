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
      }
    }
  }
  `)
  return (
    <main>
      <div className='md:container md:mx-auto'>
        <h1 className='text-7xl font-bold mb-5'>{props.data.datoCmsHomepage.title}</h1>
        {result.datoCmsHomepage.featuredArticles.map(featuredArticles => (
          <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl" key={featuredArticles.originalId}>
            <div className="md:flex">
              <div className="md:shrink-0">
                <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=404&q=80" alt="Man looking at item at a store"/>
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{featuredArticles.articleTitle}</div>
                <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
                <p className="mt-2 text-slate-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export const query = graphql `
query PageQuery($pageId: String ){
  datoCmsHomepage(originalId: {eq: $pageId}) {
    slug
    title
    originalId
  }
}
`

export default GenericPage