# Vue Task Manager

A simple **Task Manager** web application built with **Vue 3**, **Tailwind CSS**, and **Supabase**. Users can create, edit, complete, and delete tasks, with authentication handled by Supabase.

## Features

- **User Authentication** via Supabase
- Add, edit, and delete tasks
- Mark tasks as completed
- Inline editing with auto-focus
- Optimistic UI updates
- Responsive design (mobile-first)
- Clean and modern UI with Tailwind CSS

## Tech Stack

- **Frontend:** Vue 3, Composition API, Tailwind CSS
- **Backend / Database:** Supabase (PostgreSQL)
- **Routing:** Vue Router
- **State Management:** Vue `ref` + reactive Composition API

## Screenshots

_(Optional: Add some screenshots of your dashboard, task form, and task list here)_

## Installation

1. Clone the repo:

````bash
git clone https://github.com/inno-stack/vue-task-manager.git
cd vue-task-manager
2. Install dependencies:

```bash
npm install
3. Run the development server:/Run the app locally:
npm run dev
4. Create a Supabase project and update your lib/supabase.js file with your Supabase URL and public key:
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://your-supabase-url.supabase.co",
  "your-public-anon-key"
);
The app should now be running at http://localhost:5173

Usage

Sign up / Login: Users must authenticate via Supabase.

Add Task: Enter a task in the input field and press Enter or click Add.

Edit Task: Click Edit next to a task to modify it; input is auto-focused.

Complete Task: Toggle the checkbox to mark a task as completed.

Delete Task: Click Delete to remove a task.

Folder Structure
src/
 ├─ assets/        # Static assets
 ├─ components/    # Vue components
 ├─ lib/           # Supabase client setup
 ├─ views/         # Pages / views (Dashboard, Login)
 ├─ App.vue
 └─ main.js


Contributing

Fork the repo

Create a new branch (git checkout -b feature-name)

Make changes

Commit (git commit -m "Feature")

Push (git push origin feature-name)

Open a Pull Request

License

MIT © 2025 Innocent Izuchukwu



````
