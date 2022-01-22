import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  //combine all useState 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // setday to update our DayList component
  const setDay = (day) => setState({...state, day});
  //combine all api
  useEffect(() => {
    const GET_DAYS = '/api/days';
    const GET_APPOINTMENTS = '/api/appointments';
    const GET_INTERVIEWERS = '/api/interviewers';
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS)
    ]).then((all) => {
      // console.log("check all api:",all)
      setState(prev =>({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[3].data
      }))
    })
    .catch(err => console.log(err))
  },[]);

  // use helper funtion to find appointment by given day
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  let interviewers = getInterviewersForDay(state, state.day)

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
