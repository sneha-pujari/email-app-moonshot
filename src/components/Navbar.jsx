import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../actions/sliceFilter";
import React from 'react';
function Navbar() {
  const { filter } = useSelector(state=>state.filters);
  const dispatch = useDispatch();
  const handleFiler = (filter) => {
    dispatch(setFilter(filter));
  };
  return (
    <nav>
        Filter By:
        <button className={(filter==='1')?"filtered-button":"filter-button"} onClick={()=>handleFiler('1')}>
            Unread
        </button>

        <button className={(filter==='2')?"filtered-button":"filter-button"} onClick={()=>handleFiler('2')}>
            Read
        </button>

        <button className={(filter==='3')?"filtered-button":"filter-button"} onClick={()=>handleFiler('3')}>
            Favorites
        </button>
        
        {(filter) && <button className = "filter-clear-button" onClick={()=>handleFiler('')}>clear filter</button>}
    </nav>
  )
}
export default Navbar;