# School Project (Next.js + MySQL)

Two pages:
- `pages/addSchool.jsx` — form with validation to add a school (with image upload saved to `public/schoolImages`).
- `pages/showSchools.jsx` — list of schools like an ecommerce grid.

## 1) Setup

```bash
npm install
cp .env.local.example .env.local
```

Edit `.env.local` to match your MySQL credentials.

Create the database + table:

```sql
CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(20) NOT NULL,
  image TEXT NOT NULL,
  email_id VARCHAR(255) NOT NULL
);
```

## 2) Run
```bash
npm run dev
```

- Add data at: `http://localhost:3000/addSchool`
- View data at: `http://localhost:3000/showSchools`

## Notes on Hosting
Saving files to the filesystem (e.g. `public/schoolImages`) works locally or on a traditional VPS. 
Serverless platforms like Vercel/Netlify have **ephemeral storage**; use a cloud storage (e.g. Cloudinary, S3) for production if needed.
