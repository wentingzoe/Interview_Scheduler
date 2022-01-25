import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {mode, transition, back} = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    bookInterview(id, interview)
    .then(() => {transition(SHOW)})
    .catch(err => transition(ERROR_SAVE, true))
  }

  function deleteApp() {
    transition(DELETING, true);
    cancelInterview(id)
    .then(() => {transition(EMPTY)})
    .catch(err => transition(ERROR_DELETE, true))
  }

return (
 
  <article className="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
    {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={back} />}
    {mode === SAVING && <Status message={"Saving"}/>}
    {mode === ERROR_SAVE && <Error message={"Could not save appointment."} onClose={back}/>}
    {mode === DELETING && <Status message={"Deleting"}/>}
    {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onConfirm={deleteApp} onCancel={back}/>}
    {mode === ERROR_DELETE && <Error message={"Could not delete appointment."} onClose={back}/>}
    {mode === EDIT && <Form student={interview.student} interviewers={interviewers} interviewer={interview.interviewer.id} onSave={save} onCancel={back} />}
  </article>
);

}