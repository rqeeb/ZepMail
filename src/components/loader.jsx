export default function Loader({ logoSrc }) {
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