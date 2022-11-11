import { Row, Col } from "antd";
import React from "react";
import {
  col,
  weekDays,
  weekDayName,
  weekDates,
  lightHighlighter,
} from "../styles";
import uniqid from "uniqid";
import { row, timeCol, timeString } from "../styles";
import { isTodaysDate } from "../../utils";

function TimeHeader(props) {
  let times = [
    "",
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm",
    "7:00 pm",
  ];
  return (
    <Row type="flex">
      <Col span={1} />
      {times.map((time) => (
        <Col
          key={uniqid()}
          span={3}
          style={(time === "") ? {
            fontSize: 13,
            color: "#212121",
            textAlign: "right",
            padding: 6,
            border: "1px solid rgb(224,224,224)",
            width: "80px",
            display: "grid",
            justifyContent: "center",
          }: {
            background: "#87cefa",
            fontSize: 13,
            color: "#212121",
            textAlign: "right",
            padding: 6,
            border: "1px solid rgb(224,224,224)",
            width: "80px",
            display: "grid",
            justifyContent: "center",
          }}
        >
          <p> {time} </p>{" "}
        </Col>
      ))}{" "}
    </Row>
  );
}

export default TimeHeader;
