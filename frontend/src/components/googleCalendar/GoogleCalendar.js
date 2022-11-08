import React, { Component } from "react";
import WeekView from "./weekView";
import CalendarEventHandler from "./calendarEventHandler";

class GoogleCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prof_details: JSON.parse(localStorage.getItem("professor_info")) || {},
      events: JSON.parse(localStorage.getItem("events28")) || {},
      subjects: [],
    };

    // saving data to the local storag8
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("events28", JSON.stringify(this.state.events));
    });
  }

  /**
   * Add new event in the event list in the state
   * @param {Object} event - Event object
   * {
   *  start: {timeStamp} - Time stamp for the start of the event,
   *  title: {string} - Title fo the new event,
   *  end: {timeStamp} - Time stamp for the end of the event,
   * }
   */
  addNewEvent = (event) => {
    console.log("new event receieved to be added", event);
    event = {
      ...event,
      id: CalendarEventHandler.generateId(event),
    };
    //   console.log(event);
    this.setState((previousSate) => ({
      events: CalendarEventHandler.add(previousSate.events, event),
    }));
  };

  /**
   * Updates an already existing event in the state event list
   * @param {string} event eventID id of the event
   * @param {Object} updatedEvent updated details of the event
   * {
   *  start: {timeStamp} - Time stamp for the start of the event,
   *  title: {string} - Title fo the new event,
   *  end: {timeStamp} - Time stamp for the end of the event,
   * }
   */
  updateEvent = (eventId, updatedEvent) => {
    let updated = { ...updatedEvent };
    this.setState((previousState) => {
      return {
        events: CalendarEventHandler.update(
          eventId,
          updated,
          previousState.events
        ),
      };
    });
  };

  /**
   * Deletes an event from the event list in the state
   * @param {String} eventId - Id of the event
   */
  deleteEvent = (eventId) => {
    this.setState((previousState) => {
      return {
        events: CalendarEventHandler.delete(eventId, previousState.events),
      };
    });
  };
  getSubjects = () => {
    //  axios.get('url').then((res)=>{
    //   this.setState({...this.state,subjects:res});
    //  })
    const subjects = [
      {
        course_code: "MCD501",
        course_name: "Mathematics and Computing",
        prof: "hello",
      },
      { course_code: "DFG103", course_name: "HIFI", prof: "iam back" },
      { course_code: "MNE302", course_name: "mining", prof: "ram charan" },
    ];
    this.setState({ ...this.state, subjects });
  };
  componentDidUpdate(prevProps, snapshot) {
    console.log(prevProps, "these are before update", snapshot);
  }

  componentDidMount() {
    // request the subjects or get subjects by some method
    // the below method is for manual testing
    this.getSubjects();
  }
  render() {
    const { events, subjects } = this.state;
    return (
      <WeekView
        events={events}
        subjects={subjects}
        onNewEvent={this.addNewEvent}
        onEventUpdate={this.updateEvent}
        onEventDelete={this.deleteEvent}
      />
    );
  }
}

export default GoogleCalendar;
