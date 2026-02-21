export default function InboxPanel({
  hasMsgs,
  active,
  setActive,
  messages,
  refreshingPanel,
  refreshPanel,
  refreshingInbox,
  refreshInbox,
}) {
  return (
    <section className="panel">
      <div className="panelHead">
        <div className="panelTitle">Inbox</div>

        <button
          className={`miniIconBtn ${refreshingPanel ? "spin" : ""}`}
          onClick={refreshPanel}
          aria-label="Refresh inbox"
          disabled={refreshingPanel}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
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
                <div className="previewEmpty">Select a message to read it</div>
              ) : (
                <div className="msgPreview">
                  <div className="msgHeader">
                    <div>
                      <div className="msgSubject">{active.subject}</div>
                      <div className="msgFrom">{active.from}</div>
                    </div>
                    <button className="miniIconBtn" onClick={() => setActive(null)}>
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
  );
}