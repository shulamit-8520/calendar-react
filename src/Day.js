import ContextMenu from "./ContextMenu";
import moment from "moment/moment"
import { useEffect, useState } from "react";
import EventStyle from "./EventStyle";
import './Day.css'

const Day = (props) => {
    const [eventsForDay,setEventsForDay]=useState([])
   

   useEffect(()=>
   {
    const ev=[]
    props.events.forEach(element => {
        if((moment(element.startDate).format('dddd DD-MM-YYYY')===props.d)){
            ev.push(<EventStyle e={element}></EventStyle>)}
    });
    setEventsForDay(ev)
   },[props.d,props.events])

   useEffect(()=>
   {
    const ev=[]
    props.events.forEach(element => {
        if((moment(element.startDate).format('dddd DD-MM-YYYY')===props.d)){
            ev.push(<EventStyle e={element}></EventStyle>)}
    });
    setEventsForDay(ev)
   },[props.d, props.events])

   useEffect(()=>
   {
    const ev=[]
    props.events.forEach(element => {
        if((moment(element.startDate).format('dddd DD-MM-YYYY')===props.d)){
            ev.push(<EventStyle e={element} func={props.func}></EventStyle>)}
    });
    setEventsForDay(ev)
   },[props.d, props.events, props.func])


     const componentToSetMenu = () => <div style={{fontSize: "16px", marginRight:"8px"}}>{props.d}</div>;

        const isToday = props.date && props.date.isSame(moment(), 'day');

        return (
            <div className={`day ${isToday ? 'day-today' : ''}`}>
                <div className="day-header-wrap">
                    <ContextMenu contextComponent={componentToSetMenu} func={props.func} AEvent={props.AEvent} status={"Date"} />
                    <div className="day-header">{props.date.format('dddd')}</div>
                    <div className="day-subheader">{props.date.format('DD / MM')}</div>
                </div>

                <div className="events-list">
                    {eventsForDay.length > 0 ? eventsForDay.map((e, idx) => <div key={idx}>{e}</div>) : <div className="no-events">אין אירועים</div>}
                </div>
            </div>
        )}

export default Day;