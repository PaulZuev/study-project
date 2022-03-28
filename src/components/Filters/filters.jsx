import React from "react"
import { Link } from "gatsby";
import { useState } from 'react';
import Icon from '../../images/icon.svg'

const Filters = (props) =>{
  const { allFilter } = props;
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  return(
    <div className="relative inline-block text-left" >
      <div>
          <button type="button" className='filter-button' id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => (setIsSortMenuOpen(!isSortMenuOpen))}>
            Tags
            <Icon className="-mr-1 ml-2 h-5 w-5"/>
          </button>
        <div className={`filterBox ${isSortMenuOpen ? '' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="py-1" role="none">
          {allFilter.map((menu) => {
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