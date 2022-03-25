import React from "react"
import { Link } from "gatsby";

const Header = (props) =>{
  const {title} = props;
  return(
    <header className="main-header">
      <Link to={'/'} className="text-gray-700 block pb-6 text-5xl font-extrabold" role="menuitem">{title}</Link>
    </header>
  )
}
export default Header