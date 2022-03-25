import React from "react"
import { Link } from "gatsby";
import { useState } from 'react';
import Icon from '../../images/icon.svg'

const style = {
  button : "inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500",
  box : "z-10 whitespace-nowrap origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
}

const Filters = (props) =>{
  const { allFilter } = props;
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  return(
    <div className="relative inline-block text-left" >
      <div>
          <button type="button" className={style.button} id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => (setIsSortMenuOpen(!isSortMenuOpen))}>
            Filter tags
            <Icon/>
          </button>
        <div className={`${style.box} ${isSortMenuOpen ? '' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="py-1" role="none">
          {allFilter.map((menu, id) => {
            return(
            <Link to={`/filter/${menu.slug}`} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0" key={ menu.originalId}>{menu.title}</Link>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Filters