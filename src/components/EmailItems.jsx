import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react';
import { fetchEmailList } from "../actions/sliceEmail";
import { setState } from '../actions/sliceFilter';
import Email from "./Email";

export default function EmailItems() {
    const {id, filter, read, fav} = useSelector(state=>state.filters);
    const {emailList, emailPage} = useSelector(state=>state.emails);
    const [error, setError] = useState('Loading');
    const [display, setDisplay] = useState('full');
    const dispatch = useDispatch();
    const [listShow, setListShow] = useState([]);
    useEffect(() => {
        dispatch(fetchEmailList(emailPage||1));
        const saveFilter = localStorage.getItem('saveFilter');
        if(saveFilter) {
            dispatch(setState(JSON.parse(saveFilter)));
        }
    }, [])
    useEffect(() => {
        if(id) {
            setDisplay('side');
        } else {
            setDisplay('full')
        }
    }, [id])
    useEffect(() => {
        if(Object.keys(emailList).length>0) {
            setError('');
            switch(filter) {
                case '1':
                    const unreadListShow = emailList.filter(item => !(read.includes(item.id)));
                    setListShow(unreadListShow);
                    break;
                case '2':
                    const readListShow = emailList.filter(item => read.includes(item.id));
                    setListShow(readListShow);
                    break;
                case '3':
                    const favListShow = emailList.filter(item => fav.includes(item.id));
                    setListShow(favListShow);
                    break;
                default: 
                const list = emailList.map(item => item);
                setListShow(list);
                break;                
            }
        } else {
            setListShow([]);
            setError("No mails to show");
        }
    }, [filter, emailList])
  return (
    <main className={display}>
        <div>{error}</div> {listShow.map(item => <Email key = {item.id} emailData = {item} />)}
    </main>
  )
}
