import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRead, setId } from "../actions/sliceFilter";

export default function Email({emailData}) {
    const {eid, from: {email, name}, subject, desc, date} = emailData;
    const fitlerState = useSelector(state=>state.filters);
    const {fav, read, id} = fitlerState;
    const dispatch = useDispatch();
    const [favo, setFavo] = useState('');
    const [style, setStyle] = useState('unread');
    useEffect(() => {
        if(fav.includes(eid)) {
            setFavo('Favorite');
        } else {
            setFavo('');
        }
        localStorage.setItem('saveFilter', JSON.stringify(fitlerState));
    }, [fav])
    useEffect(() => {
        if(read.includes(eid)) {
            setStyle('read');
        } else {
            setStyle('unread');
        }
        localStorage.setItem('saveFilter', JSON.stringify(fitlerState));
    }, [read])
    useEffect(() => {
        if(id === eid) setStyle('selected');
        else {
            if(read.includes(eid)) {
                setStyle('read')
            } else {
                setStyle('unread');
            }
        }
    }, [id])
    const handleClick = () => {
        dispatch(addRead(eid));
        dispatch(setId(id));
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
            <p>{date}<span className='fav'>{favo}</span></p>
        </div>
    </section>
  )
}
