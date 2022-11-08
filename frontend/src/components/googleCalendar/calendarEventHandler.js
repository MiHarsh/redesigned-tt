import moment from "moment";

const CalendarEventHandler = (function () {
  /**
   * Add event after adding meta data in the event
   * @param {arr} allEvent - Array of all the events
   * @param {Object} newEvent - Event object of the new event
   * @returns {Object} allEvents - A new object reference for all events
   */
  function addEvent(allEvents, newEvent) {
    if (!newEvent.course_code || newEvent.course_code.length == 0) {
      return allEvents;
    }
    // const time = moment (newEvent.start).hours ();
    const x1 = moment(newEvent.start).year();
    const y = moment(newEvent.start).dayOfYear();
    const z = String(x1) + String(y);
    const eventWithMeatInfo = {
      ...newEvent,
      startWeek: moment(newEvent.start).week(),
      endWeek: moment(newEvent.end).week(),
    };
    if (allEvents[z]) {
      let flag = 0;
      for (let i = 0; i < allEvents[z].length; i++) {
        let event = allEvents[z][i];
        if (event.end <= newEvent.start || newEvent.end <= event.start) {
        } else {
          // console.log(event);
          // console.log(event.start,event.end)
          // console.log(newEvent.start,newEvent.end);
          // console.log(newEvent);
          // console.log(event.end<=newEvent.start);
          // console.log(newEvent);
          flag = 1;
          break;
        }
      }
      if (flag) {
        console.log("Alert success");
      } else {
        if (allEvents[z]) {
          allEvents[z].push(eventWithMeatInfo);
        } else {
          allEvents[z] = [eventWithMeatInfo];
        }
      }
    } else {
      allEvents[z] = [eventWithMeatInfo];
    }

    console.log(allEvents, newEvent);
    return { ...allEvents };
  }

  /**
   * Generate unique id for an event
   * @param {timeStamp} start - Start timestamp of the event
   * @param {timeStamp} end - End timeStamp of the event
   * @params {string} title - Title of the event
   * @returns {string} id - Unique id
   */
  function generateUniqueId({ start, course_code, end }) {
    return start + course_code + end;
  }

  /**
   * Deletes event from the list
   * @param {string} eventId - Id of the event to be deleted
   * @param {arr} allEvents - Array of all the events
   * @returns {Object} allEvents - A new object reference for all events
   */
  function deleteEvent(eventId, allEvents) {
    let events = {};
    events = { ...allEvents };
    Object.keys(events).forEach((time) => {
      events[time] = events[time].filter((event) => event.id !== eventId);
    });
    return { ...events };
  }

  /**
   * Updates an event from the list
   * @param {string} eventId - Id of the event to be deleted
   * @param {Object} updatedEvent - Event objects with the updated data
   * @param {arr} allEvents - Array of all the events
   * @returns {Object} allEvents - A new object reference for all events
   */
  function updateEvent(eventId, updatedEvent, allEvents) {
    Object.keys(allEvents).forEach((time) => {
      //  console.log(time,allEvents[time]);
      allEvents[time] = allEvents[time].map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
      );
    });

    return { ...allEvents };
  }

  return {
    add: addEvent,
    delete: deleteEvent,
    update: updateEvent,
    generateId: generateUniqueId,
  };
})();

export default CalendarEventHandler;
