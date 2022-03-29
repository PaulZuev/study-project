import * as React from "react";
import { graphql } from "gatsby";
import Header from "../../components/Header/header";
import Filters from "../../components/Filters/filters";
import PostCard from "../../components/PostCard/postCard";
import Container from "../../components/container";
import Section from "../../components/section";

const FilterPage = ({ data, pageContext }) => {
  const allArticle = data.allDatoCmsArticle.nodes
  return(
    <Section>
      <Container>
        <Header title={data.datoCmsHomepage.title}/>
        <Filters allFilter={data.allDatoCmsFilter.nodes}/>
        <h2 className='sub-title'>
          Post by {pageContext.slug} tags
        </h2>
        <div className='grid-post lg:grid-cols-2'>
          {allArticle.map((node, id) => {
            return (
              <PostCard key={id - node.originalId} node={node}/>
            )
          })}
        </div>
      </Container>
    </Section>
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
          gatsbyImageData(
            width: 400
          )
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