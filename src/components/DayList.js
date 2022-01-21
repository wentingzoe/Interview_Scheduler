
import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props){
  // const {days, day, setDay} = props;
  const parsedDay = props.days.map((i) =>
  <DayListItem     
  key={i.id} 
  name={i.name} 
  spots={i.spots} 
  selected={i.name === props.value}
  setDay={props.onChange} />
);
  return (
    <ul>
      {parsedDay}
    </ul>
  )
};