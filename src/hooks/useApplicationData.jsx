import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //combine all useState 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // setday to update our DayList component, only impact the intended state variable without impacting the rest of the 'state' variables.
  const setDay = (day) => setState({ ...state, day });

  //GET all api, Side Effect to fetch ALL data
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
      .catch(err => console.log(err))
  }, []);

  function checkSpots(state) {
    //current day: user click
    const currentDay = state.day;
    // all details the day contains: object
    const currentDays = state.days.find(day => day.name === currentDay);
    const currentDaysIndex = state.days.findIndex(day => day.name === currentDay);
    //containts an arry of the current day's appointments are null
    const freeApp = currentDays.appointments.filter(id => !state.appointments[id].interview);
    const spots = freeApp.length;

    //make a copy of current state 
    const updateState = { ...state }
    //make a copy of the days arry from state
    updateState.days = [...state.days];

    // Make a copy of the currentDayObj. Why? .filter and .find create a new array but with reference to the orignal.
    const updateDay = { ...currentDays };

    //update the spots to object 
    updateDay.spots = spots;
    // update the entire current day object in the copied state object
    updateState.days[currentDaysIndex] = updateDay;

    return updateState

  }

  function bookInterview(id, interview) {
    console.log("BOOK INTERVIEW:", id, interview);

    return axios.put(`/api/appointments/${id}`, { interview: interview }).then(() => {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments: appointments
      })
      //updates the state to reflect the correct number of spots available
      setState((prev) => checkSpots(prev));
    })
  }

  function cancelInterview(id) {
    console.log("CANCEL INTERVIEW:", id);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments: appointments
      })
      setState((prev) => checkSpots(prev));
    })
  }

  return { state, setDay, bookInterview, cancelInterview }

}