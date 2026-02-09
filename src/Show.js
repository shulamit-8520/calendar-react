import moment from "moment/moment"
import Day from "./Day";
import './calender.css'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvents } from './EventAPI'
import {useParams} from "react-router-dom"

const Show=()=>{ 
    const IsFirstShow=useParams();
    const IsEventLoad=IsFirstShow===true?false:true;
    const [ArrEvent,setArrEvent]=useState([]);
    const navigate=useNavigate();
    // const [addBool, setAddBool] = React.useState(false);
    // const [searchBool, setSearchBool] = React.useState(false);
    const [now, setNow]=useState(moment().startOf('week'))
    function prev(){
        setNow(moment(now.add(-7, 'days')))
    }
    function AddEvent(){
    localStorage.removeItem('title');
    localStorage.removeItem('description');
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    localStorage.removeItem("Event_id")
        navigate("../Event",{repleace:false});
    }
    function next(){
        setNow(moment(now.add(7, 'days')))
    }

    const go_to_today=()=>{
        setNow(moment().startOf('week'))
    }
    const Search=()=>{
        navigate("../Search",{repleace:false});
    }

    const  loadEvents=async()=>
    {
       if(IsEventLoad){
        const userId=localStorage.getItem('userKey');
        try {
            const response = await getEvents(userId);
            if(response && response.data && response.data['value']){
                setArrEvent(response.data['value']);
            } else {
                setArrEvent([]);
            }
        } catch(e) {
            console.log("Error loading events:", e);
            setArrEvent([]);
        }
       }
    }
    useEffect(() => {
        loadEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    return(
    <div><div className="container_button">
    <button  className="button"  onClick={prev} icon="pi-angle-double-left">שבוע קודם</button>
    <button className="button" onClick={go_to_today}>השבוע</button>
    <button className="button" icon="pi-angle-double-right" iconPos="right" onClick={next} hight="200"> שבוע הבא</button>
    <button className="button" onClick={AddEvent}> הוסף ארוע </button>
    <button className="button" onClick={Search}> חפש ארוע</button>
    </div>
    <br/><br/>
    <div className="container_days">
    {new Array(7).fill('').map((d,index)=>{
    const dayDate = now.clone().day(index);
    return <Day bb={true} func={go_to_today} events={ArrEvent} AEvent={AddEvent} key={index} date={dayDate} d={dayDate.format('dddd DD-MM-YYYY')}/>
    })}    </div>
    </div>)

}
export default Show;