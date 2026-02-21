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
  const [messages, setMessages] = useState([
    {
      id: "demo-1",
      from: "Raqeeb",
      subject: "The OTP for x service is..",
      body: "The OTP for x service is 7869 - Thanks",
      time: "Just now",
    },
    {
      id: "demo-1",
      from: "Raqeeb",
      subject: "The OTP for x service is..",
      body: "The OTP for x service is 7869 - ThanksThe OTP for x service is 7869 - ThanksThe OTP for x service is 7869 - ThanksThe OTP for x service is 7869 - Thanks",
      time: "Just now",
    },
    {
      id: "demo-1",
      from: "Raqeeb",
      subject: "The OTP for x service is..",
      body: "The OTP for x service is 7869 - Thanks",
      time: "Just now",
    },
  ]);
  const [active, setActive] = useState(null);
  const hasMsgs = useMemo(() => messages.length > 0, [messages]);
  const [spinning, setSpinning] = useState(false);
  const [refreshingInbox, setRefreshingInbox] = useState(false);
  const [refreshingPanel, setRefreshingPanel] = useState(false);

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
    setSpinning(true);

    setTimeout(() => {
      setEmail(genLocalMail());
      setMessages([]);
      setActive(null);
      setSpinning(false);
    }, 600);
  }

  function refreshInbox() {
    if (refreshingInbox) return;

    setRefreshingInbox(true);

    setTimeout(() => {
      // TODO: Fetch()
      setRefreshingInbox(false);
    }, 700);
  }

  function refreshPanel() {
    if (refreshingPanel) return;

    setRefreshingPanel(true);

    setTimeout(() => {
      // TODO: Fetch()
      setRefreshingPanel(false);
    }, 700);
  }

  /// Break -------------------------- Point
  return (
    <div className="page">
      {/* TopBar - Header */}
     
      <header className="topbar">
        <div className="topbarInner">
          <img
            className="brandLogo"
            src={logoSrc}
            onClick={() => window.location.reload()}
            alt="ZepMail"
            draggable="false"
          />

          <button
            className="iconBtn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
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

              <button className="btn refreshBtn" onClick={changeEmail}>
                <span
                  className={`btnIcon ${spinning ? "spin" : ""}`}
                  aria-hidden="true"
                >
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
                Refresh
              </button>
            </div>
          </div>
        </section>

        {/* --------------Here fixes req------------ */}
        <section className="panel">
          <div className="panelHead">
            <div className="panelTitle">Inbox</div>

            <button
              className={`miniIconBtn ${refreshingPanel ? "spin" : ""}`}
              onClick={refreshPanel}
              aria-label="Refresh inbox"
              disabled={refreshingPanel}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
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
            </button>
          </div>

          <div className="panelBody">
            {!hasMsgs ? (
              <div className="empty">
                <div className="emptyArt" aria-hidden="true">
                  <svg viewBox="0 0 220 140" width="220" height="140">
                    <path
                      d="M30 52c0-8 6-14 14-14h132c8 0 14 6 14 14v64c0 8-6 14-14 14H44c-8 0-14-6-14-14V52Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.22"
                    />
                    <path
                      d="M38 56l72 46 72-46"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.28"
                    />
                    <circle
                      cx="170"
                      cy="34"
                      r="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.22"
                    />
                    <path
                      d="M154 34h32"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.22"
                      strokeLinecap="round"
                    />
                    <path
                      d="M170 18v32"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.22"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="emptyTitle">You have 0 new messages</div>
                <div className="emptySub">
                  Refresh your inbox or enjoy the peace and quiet.
                </div>

                <button
                  className="btn ghost"
                  onClick={refreshInbox}
                  disabled={refreshingInbox}
                >
                  <span
                    className={`btnIcon ${refreshingInbox ? "spin" : ""}`}
                    aria-hidden="true"
                  >
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
                  Refresh
                </button>
              </div>
            ) : (
              <div className={`inboxLayout ${active ? "hasActive" : ""}`}>
                <div className="list">
                  {messages.map((m) => (
                    <button
                      key={m.id}
                      className={`row ${active?.id === m.id ? "activeRow" : ""}`}
                      onClick={() => setActive(m)}
                    >
                      <div className="rowFrom">{m.from}</div>
                      <div className="rowSub">{m.subject}</div>
                      <div className="rowMeta">{m.time}</div>
                    </button>
                  ))}
                </div>

                <div className="previewArea">
                  {!active ? (
                    <div className="previewEmpty">
                      Select a message to read it
                    </div>
                  ) : (
                    <div className="msgPreview">
                      <div className="msgHeader">
                        <div>
                          <div className="msgSubject">{active.subject}</div>
                          <div className="msgFrom">{active.from}</div>
                        </div>
                        <button
                          className="miniIconBtn"
                          onClick={() => setActive(null)}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="msgBody">{active.body}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="footer">Made with {":3"}</footer>
      </main>
    </div>
  );
}

export default App;


// TODO: Seprate Components/Functions
// TODO: Backend
// TODO: Complete CSS 