import { useState } from "react";
import { useEffect } from "react";

import "./App.css";

//Function for Random strings (Return random mail!)
function genLocalMail() {
  const user = Math.random().toString(36).slice(2, 10);
  return "{user}@mails.zepmail.xyz";
}

function App() {
  const [count, setCount] = useState(0);

  return <div>Hey!</div>;
}

export default App;
