import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData (){
  //combine all useState 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // setday to update our DayList component, only impact the intended state variable without impacting the rest of the 'state' variables.
  const setDay = (day) => setState({...state, day});
  
  //GET all api, Side Effect to fetch ALL data
  useEffect(() => {  
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev =>({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
    .catch(err => console.log(err))
  },[]);

  function bookInterview(id, interview){
    console.log("BOOK INTERVIEW:",id, interview);
  
    return axios.put(`/api/appointments/${id}`, {interview: interview}).then(() => {
      
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
    
    }) 
  }

  function cancelInterview (id) {
    console.log("CANCEL INTERVIEW:",id);
    return axios.delete(`/api/appointments/${id}`).then(()=> {
      const appointment = {
        ...state.appointments[id],
        interview:null
      };   
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state, 
        appointments: appointments
      })
    })
  }

  return {state, setDay, bookInterview, cancelInterview}

}