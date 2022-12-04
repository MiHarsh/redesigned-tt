import React from "react";
import { Input, DatePicker } from "antd";
import moment from "moment";
import { inputStyles } from "../styles";
import { BookedSlotView } from "./BookedSlotView";
const { RangePicker } = DatePicker;

// if the current slot is booked, booked slot view is rendered

const AddEvent = (props) => {
  console.log("on addevent, data of all the courses are present", props);
  return (
    <React.Fragment>
      {props.isBooked ? (
        <>
          <BookedSlotView slot_time={props.start} data={props.data} present_subject={props.present_subject} />
        </>
      ) : props.present_subject ? (
        <>
          <Input
            type="text"
            placeholder="Add Title"
            value={props.present_subject.course_name}
            style={{ ...inputStyles, marginTop: "1px" }}
            size="large"
            autoFocus={true}
          />
          <RangePicker
            style={{ width: "100%" }}
            value={[moment(props.start), moment(props.end)]}
            onChange={(e) => {
              console.log(props.title);
              props.onTimeChange({ dates: e, title: props.title });
            }}
            showTime={{
              format: "HH:mm",
              hourStep: 1,
              minuteStep: 60,
              defaultValue: [moment(props.start), moment(props.end)],
            }}
            format="MMM Do, YYYY hh:mm a"
          />
        </>
      ) : (
        <>
          <select
            style={{
              ...inputStyles,
              width: "100%",
              height: "30px",
              fontFamily: "sans-serif",
              fontSize: "20px",
            }}
            onChange={(e) => {
              props.onTitleChange(e.target.value);
            }}
          >
            <option selected value="none">
              Subject
            </option>
            {props.subjects.map((sub) => {
              return (
                <option
                  style={{ ...inputStyles, width: "100%" }}
                  value={sub.course_code}
                >
                  {sub.course_name}
                </option>
              );
            })}
          </select>
          <RangePicker
            style={{ width: "100%" }}
            value={[moment(props.start), moment(props.end)]}
            onChange={(e) => {
              console.log(props.title);
              props.onTimeChange({ dates: e, title: props.title });
            }}
            showTime={{
              format: "HH:mm",
              hourStep: 1,
              minuteStep: 60,
              defaultValue: [moment(props.start), moment(props.end)],
            }}
            format="MMM Do, YYYY hh:mm a"
          />
        </>
      )}
    </React.Fragment>
  );
};

export default AddEvent;
