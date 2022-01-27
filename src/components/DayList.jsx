
import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const { days, day, setDay } = props;
  const parsedDay = days.map((i) =>
    <DayListItem
      key={i.id}
      name={i.name}
      spots={i.spots}
      selected={i.name === day}
      setDay={setDay} />
  );
  return (
    <ul>
      {parsedDay}
    </ul>
  )
};