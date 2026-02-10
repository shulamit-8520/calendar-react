import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import {addEvent} from './EventAPI'
import { useRef, useState } from 'react';
import moment from 'moment';
import {useParams} from "react-router-dom"
import { deleteEvent } from './EventAPI';
// import {v4 as uuidv4} from 'uuid'
import './calender.css'
import './Event.css'

import React from 'react'; 
const Event = (props) => {

  const eventdefault=parseInt(useParams().event, 10);
  
  const Is_Update=eventdefault==NaN?false:true;
  const EventLSG=eventdefault? localStorage.getItem('event_id'):"";
  // const personAsObjectAgain = JSON.parse(EventLSG);
  const title=Is_Update?localStorage.getItem('title'):"";
  const decribetions=Is_Update?localStorage.getItem('description'):"";
  // const start=Is_Update?localStorage.getItem('startDate'):new moment();
  // const end=Is_Update?localStorage.getItem('endDate'):new moment();
  const start=Is_Update?new moment(localStorage.getItem('startDate')):new moment();
  const end=Is_Update?new moment(localStorage.getItem('endDate')):new moment();
  const navigate = useNavigate();
  const [dateStart, setDateStart] = useState(start)
  const [dateEnd, setDateEnd] = useState(end)
  const titleRef = useRef('')
  const descriptionRef = useRef('')
  const dateStartRef = useRef('')
  const dateEndRef = useRef('')
  
  const cancel = () => {
    navigate("../Show", { replace: false });
    }
  const deleteing = async()=>{
    console.log(eventdefault)
    await deleteEvent(eventdefault).then((response)=>
        {
            console.log(response);
        })
}

  const saveEvent = async() => {
    // localStorage.removeItem('Event_id');
    // localStorage.removeItem('userId');
    // localStorage.removeItem('title');
    // localStorage.removeItem('description');
    // localStorage.removeItem('startDate');
    // localStorage.removeItem('endDate');
    // await 
    if(Is_Update)
    {
      deleteing()
    }
    console.log('titleRef.current',titleRef.current.value);
    const newEvent = {
      "eventId": Math.floor(Math.random()*100),
      "userId": localStorage.getItem('userKey'),
      "title": titleRef.current.value,
      "description": descriptionRef.current.value,
      "startDate":dateStart,
      "endDate": dateEnd
    }

try{
  addEvent(newEvent)
  console.log(newEvent);
}
   catch(e){
    console.log(e)
   } 
   navigate("../Show", { replace: false });

  }
  const handleDateChange = (date) => {
    setDateStart(date); // עדכון המצב עם התאריך החדש
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="event-container">
        <div className="event-card">
          <div className="event-form">
            <h2 className="event-title-main">{Is_Update ? 'עדכון אירוע' : 'יצירת אירוע חדש'}</h2>

            <div className="field">
              <label>כותרת האירוע</label>
              <input className="event-input" placeholder="הכנס כותרת לאירוע" ref={titleRef} defaultValue={title} />
            </div>

            <div className="field">
              <label>תיאור</label>
              <textarea className="event-textarea" ref={descriptionRef} placeholder="הכנס תאור האירוע" defaultValue={decribetions} />
            </div>

            <div className="field-row">
              <div className="field small">
                <label>תאריך התחלה</label>
                <DatePicker onChange={handleDateChange} defaultValue={start} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
              </div>

              <div className="field small">
                <label>תאריך סיום</label>
                <DatePicker onChange={setDateEnd} defaultValue={end} slotProps={{ textField: { fullWidth: true, size: 'small' } }} />
              </div>
            </div>

            <div className="event-actions">
              <button className="button" onClick={saveEvent}>שמור</button>
              <button className="button" onClick={cancel}>ביטול</button>
            </div>
          </div>

          <div className="event-preview">
            <div className="preview-card">
              <h3 className="preview-title">תצוגה מקדימה</h3>
              <div className="preview-content">
                <div className="preview-name">{titleRef.current?.value || title || 'כותרת אירוע'}</div>
                <div className="preview-desc">{descriptionRef.current?.value || decribetions || 'תיאור האירוע יופיע כאן'}</div>
                <div className="preview-dates">{moment(dateStart).format('LLL')} — {moment(dateEnd).format('LLL')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
export default Event