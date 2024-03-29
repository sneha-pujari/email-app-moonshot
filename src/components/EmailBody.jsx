import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {fetchEmailBody, setEmailBody} from "../actions/sliceEmail";
import {addFav, removeFav} from "../actions/sliceFilter";

export default function EmailBody() {
    const [data, setData] = useState({from: {name: ''}, date: ''});
    const {fav, emailId} = useSelector(state=>state.filters);
    const {emailList, emailBody} = useSelector(state => state.emails);
    const dispatch = useDispatch();
    const {from :{name}, date} = data;
    const [favourite, setFavourite] = useState(false);
    useEffect(() => {
      setData(emailList.find(item => item.id===emailId));
      if(fav.includes(emailId)) {
        setFavourite(true);
      } else {
        setFavourite(false);
      }
      dispatch(setEmailBody('Loading..'));
      dispatch(fetchEmailBody(emailId));
    }, [emailId])
    const handleFavs = () => {
        if(favourite) {
            dispatch(removeFav(emailId));
        } else {
            dispatch(addFav(emailId));
        }
        setFavourite(item => !item);
    }
  return (
    <aside>
        <section className='email-body'>
            <div className='avatar'>
                <div className='logo'>{name[0]}</div>
            </div>
            <div className='details'>
                <div className='body-details'>
                    <div className='name'>{name}</div>
                    <button className={(favourite) ? 'notfav' : 'fav'} onClick={() => handleFavs()}>{(favourite) ? 'Remove from favourites' : 'Mark as favourite'}</button>
                </div>
                <p>{date}</p>
                <div dangerouslySetInnerHTML={{ __html: emailBody }}></div>
            </div>
        </section>
    </aside>
  )
}
