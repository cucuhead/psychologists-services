# 🧠 Psychologists.Services

A web platform for discovering and booking appointments with professional psychologists. Users can browse specialists, filter by name, price or popularity, save favorites, and request consultations — all backed by Firebase.

🔗 **Live Demo:** [psychologists-services.vercel.app](https://psychologists-services.vercel.app)

---

## 🚀 Features

- **Authentication** — Secure sign up, login and session management via Firebase Auth
- **Psychologist Catalog** — Real-time data from Firebase Realtime Database with paginated loading (3 cards at a time)
- **Filtering & Sorting** — Sort by name (A–Z, Z–A), hourly price, or popularity rating
- **Favorites** — Persistent favorites list (localStorage) available only to authenticated users
- **Expanded Cards** — "Read more" reveals full profile, reviews, and ratings
- **Appointment Booking** — Validated form with date/time picker (react-hook-form + yup)
- **Responsive Design** — Fully responsive from 320px to 1440px

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Core | React 18, Vite |
| State Management | Redux Toolkit, createAsyncThunk |
| Backend & Auth | Firebase Realtime Database, Firebase Auth |
| Forms & Validation | React Hook Form, Yup |
| Routing | React Router v6 |
| Styling | CSS Modules, React Hot Toast, React Datepicker |

---

## 🏗️ Getting Started

```bash
# Clone the repository
git clone https://github.com/cucuhead/PsychologistsServices.git

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## 📐 Technical Decisions

- **Firebase Pagination** — Each "Load more" click sends a new query to Firebase using `orderByKey` + `startAfter` + `limitToFirst(3)`, keeping initial load fast and minimizing data transfer
- **Auth Guard** — Favorites and appointment booking are restricted to logged-in users; unauthorized attempts show a modal prompt
- **Persistent Favorites** — Favorites are stored in localStorage and rehydrated on login, surviving page refreshes
- **Form Validation** — All appointment fields validated with Yup schema; email format and phone number pattern enforced

---

## 👤 Author

**Burcu Budak** — Fullstack Developer