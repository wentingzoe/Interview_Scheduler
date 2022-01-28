import { useState } from "react";
export default function useVisualMode(initial) {
  // The mode state is what is controlled in useVisualMode
  const [mode, setMode] = useState(initial);
  // keep track of the history of the modes
  const [history, setHistory] = useState([initial]);

  // Replace -- place newMode in place of last mode instead of pushing it after.
  function transition(newmode, replace = false) {
    if (replace) {
      history.pop();
    }
    history.push(newmode);
    setHistory([...history]);
    setMode(history[history.length - 1]);
  }
  // Back -- Moves to the previous mode
  const back = () => {
    if (history.length > 1) {
      // If there is only one item (i.e. first mode), don't pop.
      history.pop();
    }
    setHistory([...history]);
    setMode(history[history.length - 1]);
  }
  return { mode, transition, back };
}

/******
 * history = [EMPTY] 
 * mode = EMPTY 
 * history = [EMPTY, CREATE] 
 * mode = CREATE
 * -> back 
 * history = [EMPTY]
 * mode = EMPTY
 * 
 * 
 * history =[EMPTY]
 * mode = EMPTY
 * -> add
 * history = [EMPTY, CREATE] 
 * mode = CREATE
 * -> save
 * history = [EMPTY, CREATE, SHOW]
 * mode = SHOW
 * 
 *--- EDIT ----
 * history = [SHOW]
 * mode = SHOW
 * -> edit 
 * 
 * 
 */