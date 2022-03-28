import * as React from "react";
import { graphql, Link } from "gatsby";
import Container from "../../components/container";


const blogPage = ({ data }) => {
  const markdownRemark = data.datoCmsArticle.articleTextNode.childMarkdownRemark
  const { html } = markdownRemark
  return(
    <main>
      <div className="heading-post pb-10 pt-10 bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <Container>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-center">{data.datoCmsArticle.articleTitle}</h1>
        </Container>
      </div>
      <div className="body-post bg-gradient-to-r from-green-400 to-blue-500 relative">
        <Link to={"/"} className='back'>
            Back
          </Link>
        <Container className="pb-10 pt-10">
          <div className="flex items-center justify-center mb-2">
            <img className="h-56 w-fauto object-cover sm:h-72 md:h-96 lg:w-50 lg:h-50" src={data.datoCmsArticle.articlePicture.url}/>
          </div>
          <div className="">
            <p dangerouslySetInnerHTML={{ __html: html }} className="mt-3 p-20 text-base text-white"></p>
          </div>
        </Container>
      </div>
    </main>
  ) 
}

export const query = graphql `
  query MyQuery($id: String) {
    datoCmsArticle(id: {eq: $id}) {
      articleTitle
      articleText
      slug
      originalId
      articlePicture {
        url
      }
      articleTextNode {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
    },
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`;
export default blogPage;