import { useState, useMemo, useEffect } from "react";
import "./styles.css";

// return random mail
function genLocalMail() {
  const user = Math.random().toString(36).slice(2, 10);
  return `${user}@mails.zepmail.xyz`;
}


function Loader({ logoSrc }) {
  return (
    <div className="loaderScreen" aria-label="Loading">
      <div className="loaderWrap">
        <img className="loaderLogo" src={logoSrc} alt="ZepMail" draggable="false" />
        <div className="loaderText">Loading ZepMail…</div>
        <div className="loaderBar" />
      </div>
    </div>
  );
}

function App() {
  // States
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(() => genLocalMail());
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(null);
  const hasMsgs = useMemo(() => messages.length > 0, [messages]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  //preload logos
  useEffect(() => {
    const a = new Image();
    const b = new Image();
    a.src = "/epMail-darkmode.svg";
    b.src = "/epMail-lightmode.svg";
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
  }

  function refreshEmail() {
    setEmail(genLocalMail());
    setMessages([]);
    setActive(null);
  }
  const logoSrc =
    theme === "dark" ? "/epMail-darkmode.svg" : "/epMail-lightmode.svg";

  if (isLoading) return <Loader theme={theme} />;

  return (
    <div className="page">
      {/* TopBar - Header */}
      <header className="topbar">
        <div className="brand">
          <img
            className="brandLogo"
            src={logoSrc}
            alt="ZepMail"
            draggable="false"
          />
        </div>

        <div className="topbarRight">
          <button
            className="pill"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Dark" : "Light"}
          </button>
          <button className="pill primary" onClick={refreshEmail}>
            New address
          </button>
        </div>
      </header>

      <main className="container">
        <section className="heroCard">
          <div className="heroTitle">Your Temporary Email Address</div>

          <div className="emailRow">
            <div className="emailBox">
              <span className="mono">{email}</span>
            </div>
          </div>

          <div className="actions">
            <button className="btn" onClick={copyEmail}>
              Copy
            </button>
            <button className="btn" onClick={refreshEmail}>
              Refresh
            </button>
          </div>
        </section>

        <section className="grid">
          <section className="card">
            <div className="cardTitle">Inbox</div>

            {!hasMsgs ? (
              <div className="empty">
                No messages yet.
                <div className="loading-bar"></div>
              </div>
            ) : (
              <div className="list">
                {messages.map((m) => (
                  <button
                    key={m.id}
                    className="msg"
                    onClick={() => setActive(m)}
                  >
                    <div className="msgTop">
                      <span className="msgFrom">{m.from}</span>
                      <span className="msgTime">{m.time}</span>
                    </div>
                    <div className="msgSub">{m.subject}</div>
                    <div className="msgPrev">{m.preview}</div>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="card">
            <div className="cardTitle">Message</div>

            {!active ? (
              <div className="empty">Click a message to view it.</div>
            ) : (
              <div>
                <div className="meta">
                  <div className="kv">
                    <div className="k">From</div>
                    <div className="v">{active.from}</div>
                  </div>
                  <div className="kv">
                    <div className="k">Subject</div>
                    <div className="v">{active.subject}</div>
                  </div>
                  <div className="kv">
                    <div className="k">Time</div>
                    <div className="v">{active.time}</div>
                  </div>
                </div>

                <div className="body mono">{active.body}</div>

                <div style={{ marginTop: 12 }}>
                  <button className="btn" onClick={() => setActive(null)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </section>
        </section>
      </main>

      <footer className="footer">Made with {":3"}</footer>
    </div>
  );
}

export default App;
