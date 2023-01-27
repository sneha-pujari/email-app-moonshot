import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRead, setEmailId } from "../actions/sliceFilter";

export default function Email({emailData}) {
    const {id, from: {email, name}, subject, desc, date} = emailData;
    const filterState = useSelector(state=>state.filters);
    const {fav, read, emailId} = filterState;
    const dispatch = useDispatch();
    const [favo, setFavo] = useState('');
    const [style, setStyle] = useState('unread');
    useEffect(() => {
        if(fav.includes(id)) {
            setFavo('Favorite');
        } else {
            setFavo('');
        }
        localStorage.setItem('saveFilter', JSON.stringify(filterState));
    }, [fav])
    useEffect(() => {
        if(read.includes(id)) {
            setStyle('read');
        } else {
            setStyle('unread');
        }
        localStorage.setItem('saveFilter', JSON.stringify(filterState));
    }, [read])
    useEffect(() => {
        if(emailId === id) setStyle('selected');
        else {
            if(read.includes(id)) {
                setStyle('read')
            } else {
                setStyle('unread');
            }
        }
    }, [emailId])
    const handleClick = () => {
        dispatch(addRead(id));
        dispatch(setEmailId(id));
    }
  return (
    <section className={style} onClick={handleClick}>
        <div className="avatar">
            <div className='logo'>{name[0]}</div>
        </div>
        <div className='details'>
            <p>From: <span>{name+" <"+email+">"}</span></p>
            <p>Subject: <span>{subject}</span></p>
            <p>{desc}</p>
            <p>{date}<span className={(favo) ? 'fav' : 'not'}>{favo}</span></p>
        </div>
    </section>
  )
}
