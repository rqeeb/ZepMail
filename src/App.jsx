import { useState, useMemo, useEffect } from "react";

import "./styles.css";

//return random mail
function genLocalMail() {
  const user = Math.random().toString(36).slice(2, 10);
  return "{user}@mails.zepmail.xyz";
}

function App() {
  //States
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [Email, setEmail] = useState(() => genLocalMail);
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const hasMsgs = useMemo(() => messages.length > 0, [messages]);

  async function copyMail(){
    await navigator.clipboard.writeText(Email);
  }
  function refreshMail(){
    setEmail(genLocalMail());
    setMessages([]);
    setActive(null);
  }

  return <div className="page">
    

  </div>
}

export default App;
