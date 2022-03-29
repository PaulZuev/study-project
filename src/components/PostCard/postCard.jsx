import React from "react"
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PostCard = (props) =>{
  const { node } = props;
  const image = getImage(node.articlePicture)
  return(
    <div className="max-w-md border-solid border-1 bg-white rounded-xl drop-shadow-xl overflow-hidden md:max-w-2xl">
      <div className="lg:flex p-4">
        <div className="shrink-0 relative">
          <GatsbyImage image={image} alt={node.articleTitle} className="my-img"/>    
        </div>
        <div className="px-6">
          <div className="group-button mb-3">
              Tags:
              { node.tag.map((tags, id) =>{
                return (
                  <Link to={`/filter/${tags.slug}`} key={id - tags.originalId} className="tags">{tags.title}</Link>
                  )
                })
              }  
          </div>
          <div className="article-title">{node.articleTitle}</div>
          <p className="mt-2 text-slate-500">{node.articleShortText}</p>
          <div className="flex justify-between">
            <Link to={`/blog/${node.slug}`} className='links'>Read more</Link>
          </div> 
        </div>
      </div>
    </div>
  )
}
export default PostCard

