import { Modal, Button } from "antd";
import moment from "moment";
import React, { Component } from "react";
import AddEvent from "./AddEvent";
import axios from "axios";
let threshold = 20;
class AddEventModal extends Component {
  state = {
    course_code: this.props.course_code,
    start: this.props.start,
    end: this.props.end,
    eventId: this.props.eventId,
  };

  handleTitleChange = (title) => {
    console.log(title);
    this.setState({ ...this.state, course_code: title });
  };

  /**
   * Updates the event
   */
  handleOk = () => {
    // console.log(this.state);
    console.log(this.state);
    this.props.onOk(this.state);
    console.log(this.state.course_code, this.state.start, this.state.end);
    const detail = {
      subCode: this.state.course_code,
      startTime: this.state.start,
      endTime: this.state.end,
    };
    axios.post("http://localhost:5000/api/bookSlot", detail).then((res) => {
      console.log(res);
    });
  };
  isMeetThreshold = (data, threshold) => {
    let flag = 0;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].clashed_count > threshold) {
        flag = 1;
        break;
      }
    }
    return flag;
  };
  render() {
    let data = this.props.clashes;
    console.log(data, "props.clashes");
    return (
      <Modal
        title={
          <span style={{ textAlign: "center" }}>
            <h3 style={{ fontWeight: "bolder" }}>
              {" "}
              {this.props.present_subject
                ? this.props.present_subject.course_name
                : ""}
            </h3>{" "}
            <h3 style={{ fontWeight: "light" }}>
              Time : {moment(this.props.eventStart).format("h a")}
              {/* -{" "}
              {moment(this.props.eventEnd).format("h a")} */}
            </h3>
          </span>
        }
        visible={this.props.visible}
        onOk={() => this.handleOk()}
        onCancel={this.props.onCloseTab}
        width="70%"
        style={{ fontFamily: " sans-serif" }}
        footer={[
          <Button
            key="back"
            onClick={(e) => {
              this.props.onCancel(this.state.eventId);
            }}
          >
            {this.props.editMode ? "Delete" : "Cancel"}
          </Button>,
          <Button
            key="submit"
            type="primary"
            // disabled={
            //   this.props.isTeacherClash ||
            //   (this.props.isSubjectClash &&
            //     this.isMeetThreshold(data, threshold))
            //     ? "disabled"
            //     : ""
            // }
            onClick={() => {
              this.handleOk();
            }}
          >
            {this.props.editMode ? "Update Event" : "Add Event"}
          </Button>,
        ]}
      >
        <AddEvent
          title={this.state.course_code}
          onTitleChange={this.handleTitleChange}
          start={this.props.eventStart}
          end={this.props.eventEnd}
          onTimeChange={this.props.onTimeChange}
          isBooked={this.props.isSubjectClash}
          subjects={this.props.subjects}
          eventId={this.props.eventId}
          present_subject={this.props.present_subject}
          data={this.props.clashes}
        />
      </Modal>
    );
  }
}

export default AddEventModal;
