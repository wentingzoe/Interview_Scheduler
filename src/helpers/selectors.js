export function getAppointmentsForDay(state, day) {
  let output = [];
  const foundDay = state.days.filter(data => data.name === day);
  if(Object.keys(foundDay).length) {
    output = foundDay[0].appointments.map (id => state.appointments[id]); 
  }
  return output;
}


export function getInterview(state, interview) {
  if(!interview){
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}

export function getInterviewersForDay(state,inputDay) {
  let output = [];
  const foundDay = state.days.filter(data => data.name === inputDay);
  if(Object.keys(foundDay).length) {
    output = foundDay[0].interviewers.map (id => state.interviewers[id]); 
  }
  
  return output;
}
