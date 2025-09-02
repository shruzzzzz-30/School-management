export default function ShowSchools({ schools }) {
  const maxColumns = 4; // max columns you want per row
  const placeholders = [];

  // calculate placeholders to fill last row
  if (schools.length % maxColumns !== 0) {
    const emptyCount = maxColumns - (schools.length % maxColumns);
    for (let i = 0; i < emptyCount; i++) {
      placeholders.push(i);
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>🏫 School Directory</h1>
        <nav className="nav">
          <a className="button btn-home" href="/">Home</a>
          <a className="button btn-add" href="/addSchool">Add School</a>
        </nav>
      </header>

      {/* No schools message */}
      {(!schools || schools.length === 0) && (
        <p className="no-schools">No schools found. Add one!</p>
      )}

      {/* Schools grid */}
      <div className="grid">
        {schools.map((s) => (
          <div key={s.id} className="card">
            <img
              src={s.image?.startsWith('http') ? s.image : (s.image || '/placeholder.jpg')}
              alt={s.name}
            />
            <div className="card-body">
              <h3>{s.name}</h3>
              <p className="address">{s.address}</p>
              <p className="location">{s.city}, {s.state} - {s.pincode}</p>
              <p className="contact">📞 {s.contact}</p>
              <p className="email">✉️ {s.email_id}</p>
            </div>
          </div>
        ))}

        {/* Invisible placeholders */}
        {placeholders.map((i) => (
          <div key={`placeholder-${i}`} className="card placeholder" />
        ))}
      </div>

      <style jsx>{`
        html, body, body > div#__next, div#__next > div {
          height: 100%;
          margin: 0;
          font-family: 'Inter', Arial, sans-serif;
        }

        .container {
          min-height: 100vh;
          width: 100vw;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          color: #f1f5f9;
          background: linear-gradient(135deg, #0f172a, #1e293b, #334155);
          padding: 2rem 0.5rem;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .header h1 {
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .nav {
          display: flex;
          gap: 0.7rem;
        }

        .button {
          padding: 0.3rem 0.6rem;
          border-radius: 0.4rem;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.8rem;
          color: #fff;
          transition: all 0.2s ease;
        }

        .btn-home { background: #6366f1; }
        .btn-add { background: #4ade80; }

        .btn-home:hover { background: #5b54e6; transform: scale(1.05); }
        .btn-add:hover { background: #3ac162; transform: scale(1.05); }

        /* No schools */
        .no-schools {
          text-align: center;
          font-size: 0.85rem;
          margin-top: 2.5rem;
          color: #cbd5e1;
        }

        /* Schools grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          width: 100%;
          margin: 0 auto;
        }

        /* Card */
        .card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.7rem;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.08);
          backdrop-filter: blur(5px);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.12);
        }

        .card img {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .card-body {
          padding: 0.5rem 0.6rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .card-body h3 {
          margin: 0 0 0.25rem 0;
          font-size: 0.9rem;
          font-weight: 600;
          color: #f1f5f9;
        }

        .card-body p {
          margin: 0.1rem 0;
          font-size: 0.75rem;
          color: #e2e8f0;
        }

        .card-body .contact,
        .card-body .email {
          color: #60a5fa;
        }

        .card.placeholder {
          visibility: hidden; /* invisible but takes up space */
        }

        @media (max-width: 600px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
          }
          .nav {
            margin-top: 0.3rem;
            flex-direction: column;
            gap: 0.3rem;
          }
          .card-body h3 { font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
}
