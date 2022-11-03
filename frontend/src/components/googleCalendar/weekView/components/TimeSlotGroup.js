import React from "react";
import { Row, Col } from "antd";
import TimeSlot from "./TimeSlot";
import { row, timeCol, timeString } from "../styles";
import moment from "moment";
import uniqid from "uniqid";

function TimeSlotGroup(props) {
  const formattedTime = moment().set("hours", props.time).format("h a");
  return (
    <Row type="flex" key={uniqid()} style={row}>
      <Col style={timeCol} span={3}>
        <span style={timeString}>{formattedTime}</span>
      </Col>
      {props.weekDays.map((day) => (
        <TimeSlot
          key={uniqid()}
          dateStamp={day.dateStamp}
          time={props.time}
          openAddEventModal={props.openAddEventModal}
        />
      ))}
      {props.children}
    </Row>
  );
}

export default TimeSlotGroup;
