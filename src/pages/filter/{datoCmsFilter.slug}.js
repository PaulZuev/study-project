import * as React from "react";
import { graphql } from "gatsby";
import Header from "../../components/Header/header";
import Filters from "../../components/Filters/filters";
import PostCard from "../../components/PostCard/postCard";

const FilterPage = ({ data, pageContext }) => {
  const allArticle = data.allDatoCmsArticle.nodes
  return(
    <section className='mb-10'>
    <div className='container mx-auto'>
      <Header title={data.datoCmsHomepage.title}/>
      <Filters allFilter={data.allDatoCmsFilter.nodes}/>
      <h2 className='pt-6 text-2xl font-extrabold tracking-tight text-gray-900'>
        Post by {pageContext.slug} tags
      </h2>

      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8'>
        {allArticle.map((node, id) => {
          return (
            <PostCard key={id - node.originalId} node={node}/>
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
        originalId
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
export default FilterPage;