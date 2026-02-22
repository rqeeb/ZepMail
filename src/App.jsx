import { useState, useMemo, useEffect } from "react";
import "./styles.css";

import Loader from "./components/loader";
import InboxPanel from "./components/inboxPanel";
import { genLocalMail } from "./utils/genLocalMail";

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

  //   if (isLoading) {
  //   return <Loader logoSrc={logoSrc} />;
  // }

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

        <InboxPanel
          hasMsgs={hasMsgs}
          active={active}
          setActive={setActive}
          messages={messages}
          refreshingPanel={refreshingPanel}
          refreshPanel={refreshPanel}
          refreshingInbox={refreshingInbox}
          refreshInbox={refreshInbox}
        />
        <footer className="footer">Made with {":3"}</footer>
      </main>
    </div>
  );
}

export default App;

// TODO: Seprate Components/Functions [Done]
// TODO: Complete CSS [Done]
// TODO: Backend


