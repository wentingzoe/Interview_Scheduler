import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import PropTypes from 'prop-types'; // ES6


function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  const paredInterviewer = interviewers.map((i) =>
    <InterviewerListItem
      key={i.id}
      name={i.name}
      avatar={i.avatar}
      selected={i.id === value}
      setInterviewer={() => onChange(i.id)} />
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {paredInterviewer}
      </ul>
    </section>
  )
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;