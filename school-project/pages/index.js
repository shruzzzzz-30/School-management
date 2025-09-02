import { useState } from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setShowModal(false);
    router.push("/addSchool");
  };

  return (
    <>
      <div className={`home ${showModal ? "blurred" : ""}`}>
        {/* Floating images */}
        <img src="/images/college admission-rafiki.png" alt="Top Left" className="float top-left" />
        <img src="/images/Education-rafiki.png" alt="Top Right" className="float top-right" />
        <img src="/images/High School-rafiki.png" alt="Bottom Left" className="float bottom-left" />
        <img src="/images/school bus-rafiki.png" alt="Bottom Right" className="float bottom-right" />

        {/* Header */}
        <header className="header">
          <h1>🎓 SMART SCHOOL HUB</h1>
        </header>

        {/* Main */}
        <main className="main">
          <h2>Where Learning Takes Flight! ✨</h2>
          <div className="card">
            <button className="btn btn-add" onClick={() => setShowModal(true)}>
              ➕ Add School
            </button>
            <a className="btn btn-show" href="/showSchools">
              📖 Show Schools
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="socials">
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
          </div>
          <p>© 2025 Smart School Hub</p>
        </footer>
      </div>

      {/* Modal (outside the blurred container!) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={handleClose}>❌</button>
            <h2>⚠ Notice</h2>
            <p>You're about to add a new school.</p>
          </div>
        </div>
      )}

      {/* Styling */}
      <style jsx>{`
        .home {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #0f172a, #1e293b, #334155);
          color: #fff;
          text-align: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: filter 0.3s ease;
        }

        .home.blurred {
          filter: blur(6px);
        }

        .header h1 { font-size: 2rem; margin-bottom: 0.5rem; z-index: 2; text-shadow: 0 2px 6px rgba(0,0,0,0.5); }
        .main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; z-index: 2; }
        .main h2 { font-size: 1.6rem; font-weight: 500; color: #e0d4ff; text-shadow: 1px 1px 6px rgba(0,0,0,0.4); animation: floatCenter 4s ease-in-out infinite; }

        .card { background: rgba(255,255,255,0.12); padding: 8rem 3rem; border-radius: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.4); display: flex; gap: 1rem; z-index: 2; backdrop-filter: blur(10px); transition: transform 0.3s ease; }

        .btn { padding: 0.8rem 1.5rem; border-radius: 0.8rem; font-weight: bold; text-decoration: none; color: white; transition: transform 0.2s ease, box-shadow 0.2s ease; border: none; cursor: pointer; }
        .btn-add { background: #6366f1; }
        .btn-add:hover { background: #4f46e5; transform: scale(1.08); box-shadow: 0 5px 15px rgba(99,102,241,0.5); }
        .btn-show { background: #22c55e; }
        .btn-show:hover { background: #16a34a; transform: scale(1.08); box-shadow: 0 5px 15px rgba(34,197,94,0.5); }

        .footer { margin-top: 2rem; z-index: 2; text-align: center; font-size: 0.9rem; color: #ccc; }
        .socials { display: flex; justify-content: center; gap: 1.2rem; margin-bottom: 0.8rem; }
        .socials a { color: #fff; font-size: 1.6rem; transition: transform 0.3s, color 0.3s; }
        .socials a:hover { transform: scale(1.2); color: #38bdf8; }

        .float { position: absolute; width: clamp(180px,20vw,280px); z-index: 1; opacity: 0.95; }
        .top-left { top: 15%; left: 10%; animation: float1 6s ease-in-out infinite; }
        .top-right { top: 15%; right: 1%; animation: float2 7s ease-in-out infinite; }
        .bottom-left { bottom: 5%; left: 1%; animation: float3 5s ease-in-out infinite; }
        .bottom-right { bottom: 5%; right: 5%; animation: float4 8s ease-in-out infinite; }

        @keyframes float1 { 0%,100%{transform:translate(0,0);}50%{transform:translate(12px,-18px);} }
        @keyframes float2 { 0%,100%{transform:translate(0,0);}50%{transform:translate(-15px,-20px);} }
        @keyframes float3 { 0%,100%{transform:translate(0,0);}50%{transform:translate(18px,-12px);} }
        @keyframes float4 { 0%,100%{transform:translate(0,0);}50%{transform:translate(-12px,-22px);} }
        @keyframes floatCenter { 0%{transform:translateY(0px);}50%{transform:translateY(-15px);}100%{transform:translateY(0px);} }

        /* Modal */
        .modal-overlay { position: fixed; top:0; left:0; width:100vw; height:100vh; background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
        .modal-box { background: #fff; border-radius: 20px; padding: 30px; max-width: 400px; width: 90%; text-align:center; box-shadow: 0 12px 40px rgba(0,0,0,0.6); position: relative; }
        .modal-box h2 { color: #1e293b; margin-bottom: 10px; }
        .modal-box p { color: #334155; font-size: 1rem; }
        .modal-close { position:absolute; top:12px; right:15px; border:none; background:transparent; font-size:1.5rem; cursor:pointer; color:#334155; }
      `}</style>
    </>
  );
}
