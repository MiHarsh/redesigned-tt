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
  const { events, clashes, extraclass, cancelledSlots, mytimetable } = props;
  const obj = {};
  console.log(mytimetable, props.day.date, events, "mytt, propdate, event");
  if (events && events.length) console.log(events);

  let evns = events;
  if (!evns) {
    evns = [];
  }

  if (evns) {
    console.log(evns, "evns");
    console.log(evns.concat(clashes), "clashes concat");
    console.log(evns.concat(mytimetable), "mytimetable concat", props.day.date);
    evns
      .concat(clashes)
      .concat(mytimetable)
      .map((eve) => {
        let st = Number(moment(Number(eve.start)).format("hh"));
        let end = Number(moment(Number(eve.end)).format("hh"));
        console.log(
          st,
          evns,
          "en202",
          eve.course_code,
          "code",
          eve.start,
          eve,
          props.day
        );
        // if(eve.clashed){console.log(st,end);}
        if (st < 8) {
          st += 12;
        }
        // if (end <= 8) {
        //   end += 12;
        // }
        // for (let i = st; i < end; i++) {
        //   if (!obj[i]) {
        //     obj[i] = [];
        //   }
        //   obj[i].push(eve);
        // }
        if (!obj[st]) {
          obj[st] = [];
        }
        obj[st].push(eve);
        // console.log(obj);
        console.log(obj, "obj after concat", mytimetable, props.day.date);
      });
  }

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
            : { ...col, ...weekDays, display: "grid", justifyContent: "center"}
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
            onClassDelete={props.onClassDelete}
            onEventUpdate={props.onEventUpdate}
            subjects={props.subjects}
          />
        </>
      ))}
    </Row>
  );
}

export default WeakSlotGroup;
