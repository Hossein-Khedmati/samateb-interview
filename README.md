# Patient Management System

## Project Overview

This is a full-featured **Patient Management System** built with **Next.js**, **React**, **Redux Toolkit**, and **Material-UI (MUI)**. It allows managing patients with full CRUD operations (Create, Read, Update, Delete) and includes features like search, toggle active/inactive status, and Persian font (Vazir) support with RTL layout.

---

## Features

- Fetch all patients from API
- Add a new patient
- Edit existing patients
- Delete patients
- Toggle patient active/inactive status
- Search patients by name, email, or ID
- Persian font support (Vazir)
- Right-to-left (RTL) layout

---

## Tech Stack

- **Frontend:** Next.js 16 (App Router & Client Components)
- **State Management:** Redux Toolkit
- **UI Library:** Material-UI (MUI)
- **Styling:** Tailwind CSS + MUI SX props
- **API Requests:** Axios

---

## Project Structure

```
src/
├─ app/
│  ├─ page.js        # main page with login btn
│  ├─ layout.js        # full layout that wraps all around the app
│  ├─ dashboard       # dashboard panel route for user 
│     ├─ patient-managment        # this route includes patients datas
│         ├─ page.js        # includes patients datas and options for them
│     ├─ page.js        # includes dashboard datas
│     ├─ layout.js        # a layout that wraps around the dashboard
├─ components/
│  ├─ PatientForm.jsx         # Form modal for creating/updating patients
│  ├─ PatientTable.jsx        # Table component with search and action buttons
│  ├─ Loading.jsx             # Loading spinner component
│  ├─ Header.jsx             # Header component for Dashboard
│  ├─ Menu.jsx             # Menu component for Dashboard
│  ├─ Panel.jsx             # panel component for Dashboard
├─ redux/
│  ├─ patientsSlice.js        # Redux slice with async thunks for API calls
│  ├─ Providers.jsx           # Redux Provider wrapper
│  ├─ store.js           # Redux store
├─ lib/
│  ├─ axios.js                # Axios instance for API calls
├─ globals.css                # Tailwind + global CSS including Vazir font
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Hossein-Khedmati/samateb-interview.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The app should be running at `http://localhost:3000`.

---

## Redux & API Usage

**Redux Slice (`patientsSlice.js`)** contains async thunks for all patient-related operations:

- `fetchPatients` – GET all patients
- `addPatient` – POST a single patient
- `updatePatient` – PUT full update
- `patchPatient` – PATCH partial update
- `togglePatient` – PATCH toggle active/inactive
- `deletePatient` – DELETE a patient

**Note:** After adding a patient, the table is refreshed automatically to show the new patient including its generated ID.

---

## RTL and Persian Font Support

- The app uses **Vazir font** loaded in `globals.css`:

```css
@font-face {
  font-family: vazir;
  src: url(/Fonts/Vazirmatn-Medium.woff2);
  src: url(/Fonts/Vazirmatn-Medium.woff);
  src: url(/Fonts/Vazirmatn-Medium.ttf);
}
body {
  font-family: vazir, sans-serif;
  direction: rtl;
}
```

- All MUI components have `sx={{ fontFamily: 'vazir,sans-serif' }}` to ensure the Persian font is applied.
- Layout is RTL-friendly.

---

## Patient Table Features

- Search bar for filtering by **name**, **email**, or **ID**
- Action buttons for:
  - Edit patient
  - Toggle active/inactive
  - Delete patient
- Active status is color-coded (green = active, red = inactive)

---

## Deployment

- Build for production:

```bash
npm run build
npm run start
```

- Make sure the API supports your production domain (CORS issues may appear if API is restricted).

---

## Notes

- The app uses **Redux Toolkit** for state management and handles API data with async thunks.
- The **Modal** component is used for both adding and editing patients.
- Table automatically updates when patients are added, updated, deleted, or toggled.

---

## License

MIT License
