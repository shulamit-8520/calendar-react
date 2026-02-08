import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Event from './Event';
import { deleteEvent } from './EventAPI';
import { useNavigate } from 'react-router-dom';
export default function ContextMenu(props) {

  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : 
          null,
    );
  };
  const navigate=useNavigate();

  const editEvent = () => {
    console.log(props.e);
    localStorage.setItem('Event_id', props.e.event_id);
    localStorage.setItem('userId', props.e.userId);
    localStorage.setItem('title', props.e.title);
    localStorage.setItem('description', props.e.description);
    localStorage.setItem('startDate', props.e.startDate);
    localStorage.setItem('endDate', props.e.endDate);
    navigate(`../Event/${props.e.eventId}`,{replace:false})
    
  }
  const handleClose = (messege,e) => {
    setContextMenu(null);
    if(messege==="gototoday"){
      props.func()
    }
    else if(messege==="Edit"){editEvent()}
    else if(messege==="addNewEvent"){props.AEvent(e.target.value)}
    else if(messege==="Delete"){deleteing()}
  };
  const ContextComponent = props.contextComponent;
  const deleteing = async()=>{
    console.log(props.e);
    await deleteEvent(props.e.eventId).then((response)=>
        {
            console.log(response);
        })
}
  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      <ContextComponent></ContextComponent>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {props.status==="Event"?<> <MenuItem onClick={($event)=>handleClose("Delete",$event)}>Delete</MenuItem> <MenuItem onClick={($event)=>handleClose("Edit",$event)}>Edit</MenuItem></>
        :<><MenuItem onClick={($event)=>handleClose("addNewEvent",$event)}>New Event</MenuItem><MenuItem onClick={($event)=>handleClose("gototoday",$event)}>Go to today</MenuItem></>}

      </Menu>
    </div>
  );
}
