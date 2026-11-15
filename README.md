# PassNote

PassNote is a small password manager I built to practice the MERN-style workflow: a React frontend talking to an Express server that stores everything in MongoDB. You can save the login details for a website, copy them with a click, edit them later, or delete them when you no longer need them.

It started as a frontend-only app (that version is still in the repo), and then I added a backend so the data would stay in a database instead of disappearing on refresh.

## What it does

- Save a site, username and password
- View everything in one table
- Show or hide the password while typing it
- Copy the site, username or password with one click
- Edit or delete an entry (deleting asks for confirmation first)
- Toast messages so you know whether an action worked
- Works on both desktop and mobile screens

## Built with

- **Frontend:** React, Vite, Tailwind CSS, react-toastify, uuid
- **Backend:** Node.js, Express, body-parser, cors, dotenv
- **Database:** MongoDB

## Folder layout

There are two versions of the app in this repo:

```
Password Manager Using React/
├── passnote/                # Frontend only version
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Manager.jsx
│   │   │   └── Navbar.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── passnote with db/        # Full stack version
    ├── backend/
    │   ├── package.json
    │   └── server.js
    ├── public/
    ├── src/                 # Same structure as above
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Running it locally

You'll need Node.js and a local MongoDB instance running on the default port (`mongodb://localhost:27017`).

Clone the repo and move into the full stack version:

```bash
git clone https://github.com/yash-jaiswaldev/passnote.git
cd passnote
cd "passnote with db"
```

Start the backend first:

```bash
cd backend
npm install
node server.js
```

The server runs on port 3000 and uses a database called `passnote` with a collection called `passwords`. MongoDB creates both automatically the first time you save something.

Then, in a second terminal, start the frontend from the `passnote with db` folder:

```bash
npm install
npm run dev
```

Vite will print the local address in the terminal. Open that in your browser and you're good to go.

## API

All routes live on `http://localhost:3000/`.

| Method | What it does |
| GET | Returns all saved passwords |
| POST | Saves a new entry |
| DELETE | Deletes an entry, using the `id` sent in the request body |

## A word of caution

This is a practice project, so please don't store your real passwords in it. Everything is saved as plain text in the database, and there's no login, so anyone who can reach the server can read the data.

If I keep working on it, the first things I'd add are password encryption and user accounts.

## Author

Made by yash-jaiswaldev
