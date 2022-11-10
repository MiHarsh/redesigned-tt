import React, { Component } from "react";
import WeekView from "./weekView";
import CalendarEventHandler from "./calendarEventHandler";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import moment from "moment";

import { getAllDaysInTheWeek } from "./utils";

class GoogleCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prof_details: JSON.parse(localStorage.getItem("professor_info")) || {},
      events: JSON.parse(localStorage.getItem("events28")) || {},
      clashes: {
        MCD501: {
          2022313: [
            {
              course_code: "MCD501",
              start: 1667989800000,
              end: 1667993400000,
              eventId: "1667989800000MCD5011667993400000",
              course_name: "Mathematics and Computing",
              id: "1667989800000MCD5011667993400000",
              startWeek: 46,
              endWeek: 46,
            },
          ],
        },
      },
      subjects: [],
      mytimetable: {
        Sun: [],
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
      },
      extraclass: [],
      cancelledclass: {},
    };

    // saving data to the local storag8
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("events28", JSON.stringify(this.state.events));
    });
  }

  updateClashes = (clash) => {
    this.setState((prevState) => ({
      ...prevState,
      clashes: +clash,
    }));
  };

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
    console.log("Request to add event: ", event);
    event = {
      ...event,
      id: CalendarEventHandler.generateId(event),
    };
    //   console.log(event);
    this.setState((previousState) => ({
      events: CalendarEventHandler.add(previousState.events, event),
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

  deleteClass = (classID, course_name) => {
    console.log(classID, course_name, "cancelling");
    let cancel = { ...this.state.cancelledclass };
    cancel[classID] = course_name;
    this.setState((prev) => ({
      ...prev,
      cancelledclass: cancel,
    }));
  };

  getSubjects = () => {
    //  axios.get('url').then((res)=>{
    //   this.setState({...this.state,subjects:res});
    //  })

    const usermail = "shikha";

    // this.props.currentUser.email.split("@")[0];
    console.log(usermail);

    const weekDay = getAllDaysInTheWeek();

    axios
      .post("http://localhost:5000/api/getFacultyCD", {
        alias: usermail,
      })
      .then((response) => {
        this.setState((prev) => ({
          ...prev,
          subjects: response.data.courseOffering,
          mytimetable: response.data.generalclass,
          extraclass: response.data.extraclass,
          cancelledclass: response.data.cancelledSlots,
        }));

        console.log("Response data from getSubjects: ", response.data);
      });
  };

  componentDidUpdate(prevProps, snapshot) {
    console.log(prevProps, " these are before update ", snapshot);
  }

  componentDidMount() {
    // request the subjects or get subjects by some method
    // the below method is for manual testing
    this.getSubjects();
  }
  render() {
    const {
      events,
      subjects,
      clashes,
      mytimetable,
      extraclass,
      cancelledclass,
    } = this.state;
    console.log("Props before render: "this.props.currentUser);

    return (
      <WeekView
        events={events}
        clashes={clashes}
        setClashes={this.updateClashes}
        subjects={subjects}
        mytimetable={mytimetable}
        extraclass={extraclass}
        cancelledclass={cancelledclass}
        onNewEvent={this.addNewEvent}
        onEventUpdate={this.updateEvent}
        onEventDelete={this.deleteEvent}
        onClassDelete={this.deleteClass}
      />
    );
  }
}

export default () => {
  const { currentUser } = useAuth();

  return <GoogleCalendar currentUser={currentUser} />;
};
