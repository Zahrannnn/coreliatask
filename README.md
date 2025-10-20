# Corelia - Contact Management Application

A modern, production-ready contact management application built with React, TypeScript, and Redux Toolkit.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit http://localhost:5173 to see the app.

## ✨ Features

- ✅ User Registration & Authentication
- ✅ Contact CRUD Operations (Create, Read, Update, Delete)
- ✅ Form Validation (Email, Phone, Password)
- ✅ Sorting by Name (Ascending/Descending)
- ✅ Pagination (10 contacts per page)
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Data Persistence (LocalStorage)
- ✅ Type-Safe with TypeScript
- ✅ Redux Toolkit State Management

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Zod** - Schema validation
- **TailwindCSS 4** - Styling
- **Vite** - Build tool & dev server

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Button, Input, Modal, etc.
│   ├── contacts/       # Contact-specific components
│   └── layout/         # Header, PageLayout
│
├── pages/              # Page components
│   ├── Register.tsx
│   ├── Login.tsx
│   └── Contacts.tsx
│
├── store/              # Redux store & slices
│   ├── index.ts        # Store configuration
│   ├── hooks.ts        # Typed Redux hooks
│   ├── authSlice.ts    # Authentication state
│   └── contactsSlice.ts # Contacts state
│
├── hooks/              # Custom React hooks
│   ├── usePagination.ts
│   └── useSorting.ts
│
├── utils/              # Utility functions
│   ├── validation.ts   # Zod schemas
│   └── storage.ts      # LocalStorage helpers
│
├── types/              # TypeScript types
│   └── index.ts
│
├── App.tsx             # Main app with routing
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎯 Key Features

### Authentication
- Register with unique email validation
- Login with "Remember me" functionality
- Persistent sessions via localStorage

### Contact Management
- Add contacts with phone validation
- Edit existing contacts
- Delete with confirmation dialog
- Sort by name (A-Z / Z-A)
- Pagination (10 per page)
- Per-user contact isolation

### Data Persistence
- Auto-save to localStorage
- Survives page refresh
- Namespace isolation (`corelia_auth`, `corelia_contacts`)

## 📱 Usage

1. **Register** - Create account with name, email, password
2. **Login** - Sign in with credentials (check "Remember me" to stay logged in)
3. **Add Contact** - Click "Add Contact" button, enter name and phone
4. **Edit Contact** - Click edit icon on any contact
5. **Delete Contact** - Click delete icon (with confirmation)
6. **Sort** - Click "Sort by Name" to toggle order
7. **Navigate** - Use pagination controls for multiple pages




### Build Settings
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## 🧪 Validation Rules

### User Registration
- **Name**: 3-100 characters
- **Email**: Valid email format, must be unique
- **Password**: 6-128 characters

### Contacts
- **Name**: 1-100 characters, required
- **Phone**: 7-15 digits, optional + prefix





### Available Scripts
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```



