import React from "react";
import moment from "moment";
import ContextMenu from "./ContextMenu";
import './EventStyle.css'

const EventStyle = (props) => {
  const start = props.e && props.e.startDate ? moment(props.e.startDate).format('HH:mm') : '';
  const end = props.e && props.e.endDate ? moment(props.e.endDate).format('HH:mm') : '';

  return (
    <div className="event-item">
      <div className="event-dot" />
      <div className="event-body">
        <div className="event-title">{props.e.title}</div>
        <div className="event-time">{start}{end ? ` — ${end}` : ''}</div>
      </div>
      <ContextMenu contextComponent={() => <div>{props.e.title}</div>} func={props.func} AEvent={props.AEvent} status={"Event"} e={props.e} />
    </div>
  );
}

export default EventStyle;
