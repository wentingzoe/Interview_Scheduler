import React from "react";
import "components/DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots'
    } else if (spots === 1) {
      return '1 spot'
    } else {
      return `${spots} spots`
    }
  };


  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}