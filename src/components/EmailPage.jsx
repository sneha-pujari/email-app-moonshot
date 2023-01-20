import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchEmailList, setEmailPage} from "../actions/sliceEmail";

export default function EmailPage() {
    const {emailPage} = useSelector(state=>state.emails);
    const dispatch = useDispatch();
    const handlePgNo = (pgno) => {
        dispatch(setEmailPage(pgno));
        dispatch(fetchEmailList(pgno));
    }
  return (
    <footer>
        page: <button className={(emailPage === 1) ? "filtered-button" : "filter-button"} onClick={() => handlePgNo(1)}>1</button>
        <button className={(emailPage === 2) ? "filtered-button" : "filter-button"} onClick={() => handlePgNo(2)}>2</button>
    </footer>
  )
}
