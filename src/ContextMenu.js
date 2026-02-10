import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
  //const ContextComponent = props.contextComponent;
  const deleteing = async()=>{
    console.log(props.e);
    await deleteEvent(props.e.eventId).then((response)=>
        {
            console.log(response);
        })
}
  return (
    <Menu
      open={contextMenu !== null}
      onClose={() => handleClose()}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      onContextMenu={(e) => {
        e.preventDefault();
        handleClose();
      }}
    >
      <MenuItem onContextMenu={handleContextMenu} onClick={(e) => handleClose("Edit",e)}>עריכה</MenuItem>
      <MenuItem onContextMenu={handleContextMenu} onClick={(e) => handleClose("Delete",e)}>מחיקה</MenuItem>
      <MenuItem onContextMenu={handleContextMenu} onClick={(e) => handleClose("addNewEvent",e)}>הוסף אירוע חדש</MenuItem>
      <MenuItem onContextMenu={handleContextMenu} onClick={(e) => handleClose("gototoday",e)}>חזור להיום</MenuItem>
    </Menu>
  );
}