import * as React from "react";
import { graphql, Link } from "gatsby";

const blogPage = ({ data }) => {
  const markdownRemark = data.datoCmsArticle.articleTextNode.childMarkdownRemark // data.markdownRemark holds your post data
  const { html } = markdownRemark
  console.log(markdownRemark)
  return(
    <main>
      <div className="heading-post pb-10 pt-10 bg-gradient-to-r from-violet-500 to-fuchsia-500">
        <div className="md:container md:mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-center">{data.datoCmsArticle.articleTitle}</h1>
        </div>
      </div>
      <div className="body-post bg-gradient-to-r from-green-400 to-blue-500 relative">
        <Link to={"/"} class="absolute bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-500 ... top-10 left-20 inline-flex items-center justify-center px-2 py-1 border-none border-transparent text-base font-medium rounded-md text-white">
            Back
          </Link>
        <div className="container mx-auto pb-10 pt-10 ">
          <div className="flex items-center justify-center mb-2">
            <img className="h-56 w-fauto object-cover sm:h-72 md:h-96 lg:w-50 lg:h-50" src={data.datoCmsArticle.articlePicture.url}/>
          </div>
          <div className="">
            <p dangerouslySetInnerHTML={{ __html: html }} className="mt-3 p-20 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            
            </p>
          </div>
        </div>
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