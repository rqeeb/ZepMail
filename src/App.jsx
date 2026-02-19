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
        <img
          className="loaderLogo"
          src={logoSrc}
          alt="ZepMail"
          draggable="false"
        />
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

  const logoSrc =
    theme === "dark" ? "/epMail-darkmode.svg" : "/epMail-lightmode.svg";
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

  function changeEmail() {
    setEmail(genLocalMail());
    setMessages([]);
    setActive(null);
  }

  function refreshInbox() {
    // TODO:
  }

  if (isLoading) return <Loader logoSrc={logoSrc} />;

  /// Break -------------------------- Point
  return (
    <div className="page">
      {/* TopBar - Header */}
      <header className="topbar">
        <div className="topbarInner">
          <img
            className="brandLogo"
            src={logoSrc}
            alt="ZepMail"
            draggable="false"
          />

          <button
            className="iconBtn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <h1 className="title">Free Temporary Email</h1>
          <p className="sub">
            Receive emails anonymously with your private, secure temporary email
            address.
          </p>

          <div className="emailCard">
            <div className="emailRow">
              <div
                className="emailField"
                role="textbox"
                aria-label="Temporary email"
              >
                <span className="emailText">{email}</span>

                <button
                  className="miniIconBtn"
                  onClick={copyEmail}
                  aria-label="Copy email"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V7Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 17H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <button className="btn" onClick={changeEmail}>
                <span className="btnIcon" aria-hidden="true">
                  {/* refresh icon */}
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M20 12a8 8 0 1 1-2.34-5.66"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 4v6h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Change email
              </button>
            </div>
          </div>
        </section>


        {/* --------------Here fixes req------------ */}
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
