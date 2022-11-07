import React from "react";
import { Row, Col } from "antd";
import TimeSlot from "./TimeSlot";
import {
  col,
  weekDays,
  weekDayName,
  weekDates,
  lightHighlighter,
} from "../styles";
import { row, timeCol, timeString } from "../styles";
import moment from "moment";
import uniqid from "uniqid";
import { isTodaysDate } from "../../utils";
function WeakSlotGroup(props) {
  const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const { events } = props;
  const obj = {};
  if (events && events.length) console.log(events);
  if (events)
    events.map((eve) => {
      let st = Number(moment(Number(eve.start)).format("hh"));
      let end = Number(moment(Number(eve.end)).format("hh"));
      // if(eve.clashed){console.log(st,end);}
      if (st < 8) {
        st += 12;
      }
      if (end <= 8) {
        end += 12;
      }
      for (let i = st; i < end; i++) {
        if (!obj[i]) {
          obj[i] = [];
        }
        obj[i].push(eve);
      }
      // console.log(obj);
    });
  return (
    <Row type="flex" key={uniqid()} style={row}>
      <Col span={1} />
      <Col
        key={uniqid()}
        span={3}
        style={
          isTodaysDate(props.day.dateStamp)
            ? {
                ...col,
                ...weekDays,
                ...lightHighlighter,
                display: "grid",
                justifyContent: "center",
              }
            : { ...col, ...weekDays, display: "grid", justifyContent: "center" }
        }
      >
        <p style={weekDayName}>{props.day.weekDayName}</p>
        <p style={weekDates}>{props.day.date}</p>
      </Col>
      {props.time.map((time) => (
        <>
          <TimeSlot
            key={uniqid()}
            dateStamp={props.day.dateStamp}
            time={time}
            setTitle={props.setTitle}
            event={obj[time] ? obj[time] : []}
            startDate={2}
            openAddEventModal={props.openAddEventModal}
            onEventDelete={props.onEventDelete}
            onEventUpdate={props.onEventUpdate}
            subjects={props.subjects}
          />
        </>
      ))}
    </Row>
  );
}

export default WeakSlotGroup;
