export function getAppointmentsForDay (state, day) {
  let output =[];
  if(state.days.length ===0 ){
    return output;
  }
  const filteredDay = state.days.filter(data => data.name === day);
  if(Object.keys(filteredDay).length) {
    const mappedApp = filteredDay[0].appointments.map (data => state.appointments[data])
    output = mappedApp;
  }

  return output;
}

