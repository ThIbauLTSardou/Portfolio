import "../package/home/css/footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="footer_left">
          <p className="footer_question">
            Un projet web,<br />
            une idée à concrétiser<br />
            ou juste envie d'échanger ?
          </p>
          <a href="mailto:thibaultsardou1@gmail.com" className="footer_email">
            thibaultsardou1@gmail.com
            <span className="footer_email_icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </span>
          </a>
        </div>

        <div className="footer_right">
          <svg className="footer_logo" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Disque vinyle de fond */}
            <circle cx="110" cy="110" r="104" fill="#1b1502" stroke="#1b1502" strokeWidth="2"/>
            {/* Sillons */}
            <circle cx="110" cy="110" r="95" stroke="#2e2700" strokeWidth="1" opacity="0.6"/>
            <circle cx="110" cy="110" r="84" stroke="#2e2700" strokeWidth="1" opacity="0.5"/>
            <circle cx="110" cy="110" r="73" stroke="#2e2700" strokeWidth="1" opacity="0.4"/>
            <circle cx="110" cy="110" r="62" stroke="#2e2700" strokeWidth="1" opacity="0.35"/>
            <circle cx="110" cy="110" r="51" stroke="#2e2700" strokeWidth="1" opacity="0.3"/>
            {/* Label central jaune */}
            <circle cx="110" cy="110" r="38" fill="#FED73C"/>
            {/* Trou central */}
            <circle cx="110" cy="110" r="5" fill="#1b1502"/>
            {/* TS sur le label */}
            <text
              x="110"
              y="110"
              fontFamily="'Vandalust', system-ui"
              fontSize="34"
              fontWeight="900"
              fill="#1b1502"
              textAnchor="middle"
              dominantBaseline="central"
            >TS</text>
          </svg>
        </div>
      </div>

      <div className="footer_bottom">
        <nav className="footer_nav">
          <a href="#section_profil">À propos</a>
          <a href="#section_skills">Stack</a>
          <a href="#projets">Réalisations</a>
          <a href="mailto:thibaultsardou1@gmail.com">Contact</a>
        </nav>
        <span className="footer_copy">© 2025 Thibault Sardou</span>
        <div className="footer_socials">
          <a href="https://www.linkedin.com/in/thibault-sardou/" target="_blank" rel="noreferrer">LinkedIn</a>
          <span>/</span>
          <a href="https://github.com/ThIbauLTSardou" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
