import React, { Component } from "react";
import moment from "moment";
import AddEventModal from "./AddEventModal";
import { generateWeekViewCoordinates } from "../../utils";
import { eventHighlighter } from "../styles";
import uniqid from "uniqid";
class EventHighlighter extends Component {
  state = {
    showEditEventModal: false,
    eventNewStart: null,
    eventNewEnd: null,
  };

  /**
   * Deletes the event from the event list
   */
  deleteEvent = () => {
    // save it to cancelledclass state
    console.log("delete event calles", this.props.event);
    let event = this.props.event;
    this.props.onClassDelete(
      String(event.start) + event.course_code,
      event.course_name
    );

    this.props.onEventDelete(this.props.event.id);
    this.setState({
      showEditEventModal: false,
    });
  };

  /**
   * Updates the event
   * @param {string} title - Updated title of the event
   */
  updateEvent = (title) => {
    // console.log(title);
    this.props.onEventUpdate(this.props.event.id, {
      title,
      start: this.state.eventNewStart,
      end: this.state.eventNewEnd,
    });
    this.setState({
      showEditEventModal: false,
    });
  };

  /**
   * Open the edit event modal and initializes the start and end time
   */
  openEditEventModal = () => {
    console.log(this.props.event[0]);
    this.props.setTitle(this.props.event[0]);
    this.setState({
      eventNewStart: this.props.event[0].start,
      eventNewEnd: this.props.event[0].end,
    });
  };

  /**
   * Set the updated start and end times the state of the event being edited
   * @param {arr: moment, moment} - Array containing start and end date of the event
   */
  onCurrentEventTimeChange = (dates) => {
    console.log("called");
    this.setState({
      ...this.state,
      eventNewStart: +dates[0],
      eventNewEnd: +dates[1],
    });
  };

  /**
   * Closes modal and does nothing more!
   */
  closeModal = () => {
    this.setState({
      showEditEventModal: false,
    });
  };

  render() {
    // if(this.props.event) console.log(this.props);
    // if(this.props.event && console.log(this.props.event[0])){}
    console.log("Inside eventHighlighter[Harshit] ", this.props.event);
    let opac = 100 * (this.props.event[0].clash_counts/12);
    console.log("Opacity: ", opac, this.props.event[0].clash_counts);

    return (
      <React.Fragment>
        <div
          key={uniqid()}
          onClick={this.openEditEventModal}
          style={{
            ...generateWeekViewCoordinates(
              this.props.event,
              this.props.startDate
            ),
            ...eventHighlighter,
            "background": `rgba(255, 0, 0, ${opac/100})`,
          }}
        >
          {this.props.event[0].course_code} <br />
          <span style={{ fontSize: 9.7 }}>
            {moment(Number(this.props.event[0].start)).format("hh:mm a")} -{" "}
            {moment(Number(this.props.event[0].end)).format("hh:mm a")}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default EventHighlighter;
