import React from "react";
import { Col } from "antd";
import { col, slot, lightHighlighter } from "../styles";
import { isTodaysDate } from "../../utils";
import EventHighlighter from "./EventHighlighter";
import moment from "moment";
import uniqid from "uniqid";

function TimeSlot(props) {
  const { event, startDate } = props;
  console.log("inside timeslot", event, "prev is event");
  //  if(Object.keys(event).length){console.log(event);}
  // if(event.length){
  //   event.map((eve)=>{console.log(moment(eve).dayOfYear())})
  // }
  // if(event.clashed)console.log(event);
  const isTeacherSubjectPresent = (events) => {
    console.log("events is teacher", events, props, events.length === 0);
    let flag = -1;
    if (events.length === 0) {
      return {
        course_code: "ABHI",
      };
    }

    if (flag == -1) {
      return events[0];
    }
    return events[flag];
  };
  let y = isTeacherSubjectPresent(event);
  console.log("Event to be added in TT: ", event);
  return (
    <Col
      key={props.dateStamp}
      style={
        isTodaysDate(props.dateStamp)
          ? {
              ...col,
              ...slot,
              ...lightHighlighter,
            }
          : {
              ...col,
              ...slot,
            }
      }
      span={3}
      onClick={() => {
        props.openAddEventModal(
          props.dateStamp,
          event,
          props.event.length > 0 && y.start
            ? moment(Number(y.start)).hour()
            : props.time,
          props.event.length > 0 && y.end
            ? moment(Number(y.end)).hour()
            : props.time + 1
        );
      }}
    >
      {event && event.length > 0 && event[0].course_name && (
        <EventHighlighter
          onEventDelete={props.onEventDelete}
          onClassDelete={props.onClassDelete}
          onEventUpdate={props.onEventUpdate}
          setTitle={props.setTitle}
          key={y.title + y.end + y.start + uniqid()}
          startDate={startDate}
          event={event}
        />
      )}{" "}
    </Col>
  );
}

export default TimeSlot;
